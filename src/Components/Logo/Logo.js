import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import { messages } from '../../Localization/en-gb/messages';

export default class Logo extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logoTxt}>{messages.appHeader}</Text>
        <Image style={styles.logoImg} source={require('./../../Content/img/logo/logo.png')} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImg: {
    width: 80,
    height: 35
  },
  logoTxt: {
    paddingRight: 10,
    fontSize: 18,
    color: '#009aff',
    fontWeight: 'bold',
    opacity: 0.8
  }
});