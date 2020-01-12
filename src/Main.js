import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native'

import Routes from './Routes'
import { connect } from 'react-redux';

class Main extends Component<{}> {
  render() {
    const { createUser } = this.props;
    return (
      <SafeAreaView style={styles.container} >
        <StatusBar barStyle="dark-content" />
        <Routes isLoggedIn={createUser.isLoggedIn} />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1
  }
});

mapStateToProps = (state) => ({
  createUser: state.authReducer.userState
})

export default connect(mapStateToProps, null)(Main)