import React, { Component } from 'react'
import {
  View,
  Text,
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
  }

  renderInputText = (field) => {
    const { meta: { touched, error }, label, secureTextEntry, maxLength, keyboardType, placeholder, input: { onChange, ...restInput } } = field;

    return (
      <View style={styles.field} >
        <InputText onChangeText={onChange} maxLength={maxLength} placeholder={placeholder} keyboardType={keyboardType} secureTextEntry={secureTextEntry} label={label} {...restInput} />
        {(touched && error) && <Text style={styles.errorTxt}>{error}</Text>}
      </View >
    )
  }

  render() {
    const { handleSubmit, onSubmit } = this.props;

    return (
      <KeyboardAvoidingView style={styles.container} behavior='position'>
        <Text style={styles.formTitle}>{messages[this.props.type + 'Title']}</Text>
        <Text style={styles.formMessage}>{messages[this.props.type + 'Message']}</Text>

        <Field name="email" placeholder={messages.email} component={this.renderInputText} keyboardType='email-address' />
        {this.props.type === 'signUp' && <Field name="username" placeholder={messages.username} component={this.renderInputText} />}
        <Field name="password" placeholder={messages.password} component={this.renderInputText} secureTextEntry={true} />

        <TouchableOpacity style={styles.formBtn} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.formBtnTxt}>{messages[this.props.type + 'BtnTxt']}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView >
    )
  }
}