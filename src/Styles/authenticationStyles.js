import { StyleSheet } from 'react-native';

export const authenticationPageStyle = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  changeAuthenticateView: {
    color: '#3d5484',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  authenticateSeparator: {
    backgroundColor: '#d0d0d0',
    height: 1,
    width: 600,
    marginBottom: 15
  }
});

export const authenticationFormStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  field: {
    alignItems: 'center'
  },
  errorTxt: {
    color: '#000',
    fontSize: 14,
    alignContent: 'center',
    width: 300,
    marginBottom: 15
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009aff',
    marginBottom: 30,
    marginTop: -50
  },
  formMessage: {
    color: '#777',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 40
  },
  inputBox: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    marginVertical: 15
  },
  formBtn: {
    backgroundColor: '#009aff',
    width: 300,
    marginTop: 10
  },
  formBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 8
  }
});
