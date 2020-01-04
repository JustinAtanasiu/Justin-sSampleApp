import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { messages } from '../../messages';
import AuthenticateForm from './../../Components/AuthenticateFormCommon/AuthenticateForm'


export default class SignUp extends Component<{}> {
  login() {
    Actions.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <AuthenticateForm type='signUp'></AuthenticateForm>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.signUpHaveAccountAlready} onPress={this.login}>
          <Text style={styles.signUpHaveAccountAlreadyTxt}>{messages.signUpHaveAccountAlready}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signUpHaveAccountAlready: {
    marginBottom: 15
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