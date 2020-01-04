import React, { Component } from 'react'
import {
    View,
    StyleSheet
} from 'react-native';

import Logo from '../Logo/Logo';

export default class Header extends Component<{}> {
    render() {
        return (
            <View style={styles.header}>
                <Logo />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row'
    }
});