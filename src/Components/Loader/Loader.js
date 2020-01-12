import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#rgba(240, 240, 240, 0.8)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    justifyContent: 'center'
  }
});

export default class Loader extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='#000' size='large' />
      </View>
    )
  }
}