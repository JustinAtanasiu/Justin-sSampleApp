import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native'

import Header from './src/Components/Header/Header';
import Routes from './src/Routes'

const App: () => React$Node = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Routes />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1
  }
});

export default App;
