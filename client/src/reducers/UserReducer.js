import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const initalState = {
    username: '',
    jwt: ''
}

const reducer = (state = initalState, action) => {
    if (action.type === 'LOGIN') {
        return {
            ...state,
            username: action.payload.username,
            jwt: action.payload.jwt
        }
    }
    else if (action.type === 'LOGOUT') {
        return { 
            ...state,
            username: '',
            jwt: ''
        }
    }
    else {
        return {
            ...state
        };
    }
}

const userPersistConfig = {
    key: 'user',
    storage: storage, 
    stateReconciler: autoMergeLevel2
  }
  

export default persistReducer(userPersistConfig, reducer);
