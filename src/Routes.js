import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux'

import LogIn from './Pages/LogInPage/LogIn'
import SignUp from './Pages/SignUpPage/SignUp'
import Header from './Components/Header/Header'


export default class Routes extends Component<{}> {
  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#f0f0f0', borderBottomColor: 'transparent' }} duration={0} animationEnabled={false} headerMode='float' >
        <Stack key="root" >
          <Scene key="login" component={LogIn} initial={true} renderTitle={() => <Header />} headerForceInset={{ top: 'never' }} />
          <Scene key="signup" component={SignUp} renderTitle={() => <Header />} headerForceInset={{ top: 'never' }} />
        </Stack>
      </Router>
    )
  }
}