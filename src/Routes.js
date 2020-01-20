import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux'

import LogIn from './Pages/LogInPage/LogIn'
import SignUp from './Pages/SignUpPage/SignUp'
import ResetPassword from './Pages/ResetPasswordPage/ResetPassword'
import Chat from './Pages/ChatPage/Chat'
import Header from './Components/Header/Header'


export default class Routes extends Component<{}> {
  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#f0f0f0', borderBottomColor: 'transparent' }} duration={0} animationEnabled={false} headerMode='float' >
        <Scene hideNavBar={true}>
          <Scene key="root" initial={!this.props.isLoggedIn} renderTitle={() => <Header />} headerForceInset={{ top: 'never' }} >
            <Scene key="login" component={LogIn} initial={true} />
            <Scene key="signup" component={SignUp} />
            <Scene key="resetpassword" component={ResetPassword} />
          </Scene>
          <Scene key="app" initial={this.props.isLoggedIn} renderTitle={() => <Header />} headerForceInset={{ top: 'never' }} >
            <Scene key="chat" component={Chat} initial={true} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}