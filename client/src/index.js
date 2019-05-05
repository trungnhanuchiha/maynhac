import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserReducer from './store/UserReducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';



const persistConfig = {
    key: 'root',
    storage: storage,   
    stateReconciler: autoMergeLevel2
  };

const pReducer = persistReducer(persistConfig, UserReducer);
export const store = createStore(pReducer);
export const persistor = persistStore(store);

ReactDOM.render(<Provider store={store}><PersistGate persistor={persistor}><App/></PersistGate></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


