import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native'

import Routes from './Routes'
import { connect } from 'react-redux';

class Main extends Component<{}> {

  state = {
    isLoggedIn: this.props.authData ? this.props.authData.isLoggedIn : false
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { authData: { isLoggedIn } } = nextProps;
    return (isLoggedIn !== nextState.isLoggedIn);
  }

  render() {
    const { authData: { isLoggedIn } } = this.props;
    return (
      <SafeAreaView style={styles.container} >
        <StatusBar barStyle="dark-content" />
        <Routes isLoggedIn={isLoggedIn} />
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

mapStateToProps = state => ({
  authData: state.authReducer.authData
})

export default connect(mapStateToProps, null)(Main)