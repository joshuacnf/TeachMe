import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistCombineReducers } from 'redux-persist';
import reducers from './reducer';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

const persistReducers = persistCombineReducers(config, {
  reducers,
});

const configureStore = () => {
  const store = createStore(persistReducers);
  const persistor = persistStore(store);

  return { persistor, store };
};

export default configureStore;