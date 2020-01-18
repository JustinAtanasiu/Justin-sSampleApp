import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { messages } from '../../Localization/en-gb/messages';
import { createNewUser } from '../../Actions/auth.actions';
import Loader from '../../Components/Loader/Loader';
import AuthenticateForm from '../../Components/AuthenticateFormCommon/AuthenticateForm';
import { authenticationPageStyle as styles } from '../../Styles/authenticationStyles';
import { validateSignUp as validate } from '../../Service/ValidationService/validationService';

class SignUp extends Component<{}> {
  goToLogin() {
    Actions.pop();
  }

  createNewUser = (values) => {
    this.props.dispatch(createNewUser(values, this.props.reset));
  }

  onSubmit = (values) => {
    this.createNewUser(values);
  }

  render() {
    const { handleSubmit, userState } = this.props;
    return (
      <View style={styles.container}>
        {userState.isLoading && <Loader />}
        <AuthenticateForm type='signUp' onSubmit={this.onSubmit} handleSubmit={handleSubmit} />

        <View style={styles.authenticateSeparator} />
        <TouchableOpacity onPress={this.goToLogin}>
          <Text style={styles.changeAuthenticateView}>{messages.signUpHaveAccountAlready}</Text>
        </TouchableOpacity>
      </View >
    )
  }
}

mapStateToProps = (state) => {
  return {
    userState: state.authReducer.userState,
  }
};

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'register',
    validate,
    destroyOnUnmount: false
  })
)(SignUp);