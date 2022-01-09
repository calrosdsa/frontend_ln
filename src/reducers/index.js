// Root Reducer
import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile'; // DONT FORGET TO CHANGE FILE PATH // THE REDUCER IS THE ROOT OF  ALL SUFFERING
//import comment from './comment'
//import  websockets from './websockets'
import filter from './filter';
export default combineReducers({
  alert,
  auth,
  profile,
  filter,
//  websockets
});

