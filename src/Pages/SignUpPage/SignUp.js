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
import { createNewUser, resetCreateUserError } from '../../Actions/auth.actions';
import Loader from '../../Components/Loader/Loader';
import AuthenticateForm from '../../Components/AuthenticateFormCommon/AuthenticateForm';
import { authenticationPageStyle as styles } from '../../Styles/authenticationStyles';
import { validateSignUp as validate } from '../../Service/ValidationService/validationService';

class SignUp extends Component<{}> {
  goBack() {
    Actions.pop();
  }

  createNewUser = async (values) => {
    try {
      const response = await this.props.dispatch(createNewUser(values, this.props.reset));

      if (!response.success) {
        throw response;
      }
    } catch (error) {

    }
  }

  getError = () => {
    return this.props.createUser.isError && this.props.createUser.error;
  }

  onSubmit = (values) => {
    this.createNewUser(values);
  }

  onChange = () => {
    if (this.getError()) {
      this.props.dispatch(resetCreateUserError());
    }
  }

  render() {
    const { handleSubmit, createUser } = this.props;

    return (
      <View style={styles.container}>
        {createUser.isLoading && <Loader />}
        <AuthenticateForm type='signUp' onChange={this.onChange} onSubmit={this.onSubmit} handleSubmit={handleSubmit} getError={this.getError} />

        <View style={styles.authenticateSeparator} />
        <TouchableOpacity onPress={this.goBack}>
          <Text style={styles.changeAuthenticateView}>{messages.signUpHaveAccountAlready}</Text>
        </TouchableOpacity>
      </View >
    )
  }
}

mapStateToProps = (state) => {
  return {
    createUser: state.authReducer.createUser,
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