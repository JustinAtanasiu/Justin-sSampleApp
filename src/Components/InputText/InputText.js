import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, StyleSheet } from "react-native";

const propTypes = {
  mapElement: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string
}

const defaultProps = {
  mapElement: (n) => { },
  onSubmitEditing: () => { },
  onChangeText: () => { },
  value: '',
  placeholder: '',
  maxLength: 200,
  keyboardType: 'default',
  secureTextEntry: false,
  label: ''
}

class InputText extends Component<{}> {
  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this)
    }
  }

  focus() {
    this.textInput.focus()
  }

  render() {
    const { returnKeyType, placeholder, secureTextEntry, keyboardType, maxLength, value, onChangeText, onSubmitEditing } = this.props;

    return (
      <View>
        <TextInput
          ref={input => this.textInput = input}
          style={styles.inputBox} underlineColorAndroid='rgba(0, 0, 0, 0)' placeholder={placeholder} placeholderTextColor='#ccc' selectionColor="#009aff"
          color="#000" secureTextEntry={secureTextEntry} keyboardType={keyboardType} maxLength={maxLength} returnKeyType="next" value={value}
          returnKeyType={returnKeyType || 'go'} onSubmitEditing={onSubmitEditing} onChangeText={onChangeText} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputBox: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    marginVertical: 15
  }
})

InputText.defaultProps = defaultProps;
InputText.propTypes = propTypes;

export default InputText;