import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { loginUser } from '../../Actions/auth.actions';
import { messages } from '../../Localization/en-gb/messages';
import InputText from '../../Components/InputText/InputText';
import Loader from '../../Components/Loader/Loader';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorTxt: {
    color: '#000',
    fontSize: 14
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009aff',
    marginBottom: 30,
    marginTop: -50
  },
  formMessage: {
    color: '#777',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 40
  },
  formBtn: {
    backgroundColor: '#009aff',
    width: 300,
    marginTop: 10
  },
  formBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 8
  },
  signUpHaveAccountAlreadyTxt: {
    color: '#3d5484',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  separator: {
    backgroundColor: '#d0d0d0',
    height: 1,
    width: 600,
    marginBottom: 15
  }
});

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

  renderInputText = (field) => {
    const { meta: { touched, error }, label, secureTextEntry, maxLength, keyboardType, placeholder, input: { onChange, ...restInput } } = field;

    return (
      <View>
        <InputText onChangeText={onChange} maxLength={maxLength} placeholder={placeholder} keyboardType={keyboardType} secureTextEntry={secureTextEntry} label={label} {...restInput} />
        {(touched && error) && <Text style={styles.errorTxt}>{error}</Text>}
      </View >
    )
  }

  render() {
    const { handleSubmit, userState } = this.props
    return (
      <View style={styles.container}>
        {userState.isLoading && <Loader />}
        <View style={styles.container}>
          <Text style={styles.formTitle}>{messages.logInTitle}</Text>
          <Text style={styles.formMessage}>{messages.logInMessage}</Text>

          <Field name="email" placeholder={messages.email} component={this.renderInputText} keyboardType='email-address' />
          <Field name="password" placeholder={messages.password} component={this.renderInputText} />

          <TouchableOpacity style={styles.formBtn} onPress={handleSubmit(this.onSubmit)}>
            <Text style={styles.formBtnTxt}>{messages.signUpBtnTxt}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />
        <TouchableOpacity onPress={this.goToSignUp}>
          <Text style={styles.logInNoAccountTxt}>{messages.logInNoAccount}</Text>
        </TouchableOpacity>
      </View >
    )
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = messages.emailAddressRequired;
  }
  if (!values.password) {
    errors.password = messages.passwordRequired;
  }

  return errors;
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
    form: 'register',
    validate
  })
)(LogIn);