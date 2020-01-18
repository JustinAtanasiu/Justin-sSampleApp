import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { Field } from 'redux-form';

import { messages } from '../../Localization/en-gb/messages';
import InputText from '../../Components/InputText/InputText';
import { authenticationFormStyle as styles } from '../../Styles/authenticationStyles';

export default class AuthenticateForm extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type
    }
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  render() {
    const { type, handleSubmit, onSubmit, getError, onChange } = this.props;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView style={styles.container} behavior='position' >
          <Text style={styles.formTitle}>{messages[type + 'Title']}</Text>
          <Text style={styles.formMessage}>{messages[type + 'Message']}</Text>

          <Field
            onRef={(ref) => {
              this.inputs['email'] = ref;
            }}
            onEnter={() => {
              this.focusNextField(type === 'signUp' ? 'username' : 'password');
            }}
            onChange={onChange}
            name={'email'} placeholder={messages.email} component={renderInputRef} keyboardType='email-address' returnKeyType='next' />
          {type === 'signUp' &&
            <Field
              onRef={(ref) => {
                this.inputs['username'] = ref;
              }}
              onEnter={() => {
                this.focusNextField('password');
              }}
              onChange={onChange}
              name="username" placeholder={messages.username} component={renderInputRef} returnKeyType='next' />
          }
          <Field
            onRef={(ref) => {
              this.inputs['password'] = ref;
            }}
            onEnter={handleSubmit(onSubmit)}
            onChange={type != 'signUp' ? onChange : () => { }}
            name={'password'} placeholder={messages.password} component={renderInputRef} secureTextEntry={true} />

          {getError() && <Text style={styles.submitErrorTxt}>{messages[getError()]}</Text>}

          <TouchableOpacity style={styles.formBtn} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.formBtnTxt}>{messages[type + 'BtnTxt']}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView >
      </ScrollView>
    )
  }

}

export class renderInputRef extends Component<> {
  render() {
    const { meta: { touched, error }, returnKeyType, onRef, onEnter, label, secureTextEntry, maxLength, keyboardType, placeholder, input: { onChange, ...restInput } } = this.props;

    return (
      <View style={styles.field}>
        <InputText style={styles.inputBox} onRef={onRef} onChangeText={onChange} maxLength={maxLength} placeholder={placeholder} keyboardType={keyboardType} secureTextEntry={secureTextEntry} label={label} returnKeyType={returnKeyType} onSubmitEditing={onEnter} {...restInput} />
        {(touched && error) && <Text style={styles.errorTxt}>{error}</Text>}
      </View >
    )
  }
}