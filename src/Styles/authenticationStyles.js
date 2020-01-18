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
    color: 'rgba(240, 0, 0, 0.6)',
    fontSize: 14,
    alignContent: 'center',
    width: 300,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009aff',
    marginBottom: 30,
    marginTop: -50,
    textAlign: 'center',
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
    marginTop: 15,
    marginBottom: 5
  },
  formBtn: {
    backgroundColor: '#009aff',
    width: 300,
    marginTop: 30,
    alignSelf: 'center'
  },
  formBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 8
  },
  submitErrorTxt: {
    backgroundColor: 'rgba(240, 0, 0, 0.6)',
    width: 300,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 4,
    textTransform: 'capitalize',
    color: '#fff',
    alignSelf: 'center',
    marginTop: 15
  }
});
