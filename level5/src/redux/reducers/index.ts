import {combineReducers} from '@reduxjs/toolkit';
import {createPersistConfig} from './../../utils/persist';
import dashboardReducer from '@redux/reducers/dashboard';
import {persistReducer} from 'redux-persist';

const combinedReducers = combineReducers({
  dashboard: persistReducer(
    createPersistConfig({key: 'dashboard'}),
    dashboardReducer
  )
});

export default combinedReducers;
