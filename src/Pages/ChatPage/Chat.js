import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class Chat extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Chat Page</Text>
      </View>
    )
  }
}

mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser
});

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);