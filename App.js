import React from 'react';
import { Provider } from 'react-redux';
import reduxStore from './src/data/reducers';
import Chats from './src/screens/Chats';

const App = () => {
  return (
    <Provider store={reduxStore}>
      <Chats />
    </Provider>
  );
};

export default App;