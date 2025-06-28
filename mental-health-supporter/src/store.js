import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Dummy auth reducer for chat demo, replace with your real reducer
const rawUser = JSON.parse(localStorage.getItem('loggedUser')) || null;
let user = rawUser;
if (user && user.role === 'patient' && user.patient_id && !user.profile_id) {
  user.profile_id = user.patient_id;
}
const initialAuthState = {
  user,
};
function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
