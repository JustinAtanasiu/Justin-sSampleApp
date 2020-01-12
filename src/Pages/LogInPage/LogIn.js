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
import { loginUser } from '../../Actions/auth.actions';
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

  render() {
    const { handleSubmit, userState } = this.props
    return (
      <View style={styles.container}>
        {userState.isLoading && <Loader />}
        <AuthenticateForm type='logIn' onSubmit={this.onSubmit} handleSubmit={handleSubmit} />

        <View style={styles.authenticateSeparator} />
        <TouchableOpacity onPress={this.goToSignUp}>
          <Text style={styles.changeAuthenticateView}>{messages.logInNoAccount}</Text>
        </TouchableOpacity>
      </View >
    )
  }
}

mapStateToProps = (state) => {
  return {
    userState: state.authReducer.userState
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