import React, { Component } from 'react'
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { messages } from '../../Localization/en-gb/messages';
import { authenticationFormStyle as styles, authenticationPageStyle as stylesPage } from '../../Styles/authenticationStyles';
import Loader from '../../Components/Loader/Loader';
import { renderInputRef } from '../../Components/AuthenticateFormCommon/AuthenticateForm';
import { validateResetPassword as validate } from '../../Service/ValidationService/validationService';
import { resetUserPassword, changeResetUserPasswordMessage } from '../../Actions/auth.actions';

class ResetPassword extends Component<{}> {

  componentDidMount = () => {
    if (this.getResult()) {
      this.props.dispatch(changeResetUserPasswordMessage());
    }
  }

  goBack() {
    Actions.pop();
  }

  goToResetPassword() {
    Actions.resetPassword()
  }

  resetPassword = (values) => {
    this.props.dispatch(resetUserPassword(values));
  }

  onSubmit = (values) => {
    this.resetPassword(values);
  }

  getResult = () => {
    return this.props.resetUserPassword.resetMessageCode
  }

  render() {
    const { handleSubmit, resetUserPassword } = this.props;

    return (
      <View style={stylesPage.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {resetUserPassword.isLoading && <Loader />}
          <KeyboardAvoidingView style={styles.container} behavior='position' >
            <Text style={styles.formTitle}>{messages.resetPasswordTitle}</Text>
            <Text style={styles.formMessage}>{messages.resetPasswordMessage}</Text>

            <Field name={'email'} placeholder={messages.email} component={renderInputRef} keyboardType='email-address'
              onEnter={handleSubmit(this.onSubmit)} />

            {this.getResult() && <Text style={[styles.submitResponseTxt, styles.submitWarningTxt]}>{messages[this.getResult()]}</Text>}

            {!this.getResult() && <TouchableOpacity style={styles.formBtn} onPress={handleSubmit(this.onSubmit)}>
              <Text style={styles.formBtnTxt}>{messages.resetPasswordBtnTxt}</Text>
            </TouchableOpacity>}

            <View style={styles.authenticateFormExtraView}>
              <TouchableOpacity onPress={this.goBack}>
                <Text style={styles.extraViewBtnTxt}>{messages.goBack}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView >
        </ScrollView>
      </View>
    )
  }
}

mapStateToProps = (state) => {
  return {
    resetUserPassword: state.authReducer.resetUserPassword
  }
};

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'resetPassword',
    validate
  })
)(ResetPassword);