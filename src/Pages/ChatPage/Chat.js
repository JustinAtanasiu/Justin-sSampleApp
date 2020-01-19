import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

import { connect } from "react-redux";
import { logoutUser } from '../../Actions/auth.actions'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class Chat extends Component<{}> {
  logoutUser = () => {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Chat Page</Text>
        <TouchableOpacity style={styles.button} onPress={this.logoutUser}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
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