import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';

import { messages } from '../../messages';

export default class AuthenticateForm extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.formTitle}>{messages[this.props.type + 'Title']}</Text>
        <Text style={styles.formMessage}>{messages[this.props.type + 'Message']}</Text>

        <TextInput style={styles.inputBox} placeholder={messages.email} placeholderTextColor='#ccc' selectionColor="#009aff" color="#000" keyboardType="email-address" onSubmitEditing={() => this.password.focus()}></TextInput>
        <TextInput style={styles.inputBox} placeholder={messages.password} placeholderTextColor='#ccc' selectionColor="#009aff" color="#000" secureTextEntry={true} ref={(input) => this.password = input}></TextInput>

        <TouchableOpacity style={styles.formBtn}>
          <Text style={styles.formBtnTxt}>{messages[this.props.type + 'BtnTxt']}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
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
  inputBox: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    marginVertical: 15
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
  }
});