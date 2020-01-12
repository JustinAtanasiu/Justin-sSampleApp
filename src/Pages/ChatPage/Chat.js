import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class Chat extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Chat Page</Text>
      </View>
    )
  }
}