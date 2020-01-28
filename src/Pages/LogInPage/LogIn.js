import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';

import { messages } from '../../Localization/en-gb/messages';
import { loginUser, resetLoginUserError } from '../../Actions/auth.actions';
import Loader from '../../Components/Loader/Loader';
import AuthenticateForm from '../../Components/AuthenticateFormCommon/AuthenticateForm'
import { authenticationPageStyle as styles } from '../../Styles/authenticationStyles';
import { validateLogin as validate } from '../../Service/ValidationService/validationService'

class LogIn extends Component<{}> {
  handleLogInBiometrics = () => {
    Keychain.getGenericPassword()
      .then(credentials => {
        if (credentials) {
          const { username, password } = credentials;

          TouchID.authenticate(`to login with username "${username}"`).then(() => {
            this.loginUser({ email: username, password: password }, true);
          }).catch(error => {
            Alert.alert(messages.failedAuthentication);
          });
        }
      });
  }

  goToSignUp() {
    Actions.signup()
  }

  loginUser = async (values, isBiometricsLogin) => {
    try {
      const response = await this.props.dispatch(loginUser(values));
      if (!response.success) {
        throw response;
      } else {
        const { email, password } = values;
        Keychain.setGenericPassword(email, password); // store the credentials in the keychain
      }
    } catch (error) {
      if (error.statusCode === 401 && isBiometricsLogin) {
        Keychain.resetGenericPassword();
        Alert.alert(messages.invalidBiometricsCredentials);
      }
    }
  }

  onSubmit = (values) => {
    this.loginUser(values, false);
  }

  getError = () => {
    return this.props.loginUser.isError && this.props.loginUser.error
  }

  onChange = () => {
    if (this.getError()) {
      this.props.dispatch(resetLoginUserError());
    }
  }

  render() {
    const { handleSubmit, loginUser } = this.props

    return (
      <View style={styles.container}>
        {loginUser.isLoading && <Loader />}
        <AuthenticateForm type='logIn' onChange={this.onChange} onSubmit={this.onSubmit} handleSubmit={handleSubmit} getError={this.getError} handleLogInBiometrics={this.handleLogInBiometrics} />

        <View style={styles.authenticateSeparator} />
        <TouchableOpacity onPress={this.goToSignUp} hitSlop={{ top: 20, bottom: 20, left: 30, right: 30 }}>
          <Text style={styles.changeAuthenticateView}>{messages.logInNoAccount}</Text>
        </TouchableOpacity>
      </View >
    )
  }
}

mapStateToProps = (state) => {
  return {
    loginUser: state.authReducer.loginUser
  }
};

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'login',
    validate
  })
)(LogIn);