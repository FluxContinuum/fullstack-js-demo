import { combineReducers } from 'redux';

const apiResponse = (state = null, action) => {
  switch(action.type){
    case 'SET_API_RESPONSE':
      return action.payload;
    default:
      return state;
  }
}

const leftNav = (state = false, action) => {
  switch(action.type){
    case 'TOGGLE_LEFT_NAV':
      return !state;
    default:
      return state;
  }
}

const theme = (state = 'dark', action) => {
  switch(action.type){
    case 'CHANGE_THEME':
      return action.theme;
    default:
      return state;
  }
}

const errorMsg = (state = null, action) => {
  switch(action.type){
    case 'IS_LOADING':
    case 'CLEAR_ERROR':
      return null;
    case 'SET_ERROR':
      if (action.message){
        return action.message;
      }
      return 'An unknown error occurred';
    default:
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch(action.type){
    case 'IS_LOADING':
      return true;
    case 'SET_ERROR':
    default:
      return false;
  }
}

const user = (state = null, action) => {
  switch(action.type){
    case 'SET_USER':
      return action.user;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  apiResponse,
	errorMsg,
  isLoading,
  leftNav,
  theme,
  user
});

export default rootReducer;