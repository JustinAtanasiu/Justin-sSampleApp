import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import Main from './src/Main'
import persist from './src/Config/store'

const persistStore = persist();

const App: () => React$Node = () => {
  return (
    <Provider store={persistStore.store}>
      <PersistGate loading={null} persistor={persistStore.persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
