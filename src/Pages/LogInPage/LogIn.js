import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { messages } from '../../Localization/en-gb/messages';
import { loginUser, resetLoginUserError } from '../../Actions/auth.actions';
import Loader from '../../Components/Loader/Loader';
import AuthenticateForm from '../../Components/AuthenticateFormCommon/AuthenticateForm'
import { authenticationPageStyle as styles } from '../../Styles/authenticationStyles';
import { validateLogin as validate } from '../../Service/ValidationService/validationService'

class LogIn extends Component<{}> {
  goToSignUp() {
    Actions.signup()
  }

  loginUser = (values) => {
    this.props.dispatch(loginUser(values));
  }

  onSubmit = (values) => {
    this.loginUser(values);
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
        <AuthenticateForm type='logIn' onChange={this.onChange} onSubmit={this.onSubmit} handleSubmit={handleSubmit} getError={this.getError} />

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