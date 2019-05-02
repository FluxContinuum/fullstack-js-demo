// redux action constants
export const API_REQUEST = 'API_REQUEST';
export const CHANGE_THEME = 'CHANGE_THEME';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const IS_LOADING = 'IS_LOADING';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT = 'LOGOUT';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const SET_API_RESPONSE = 'SET_API_RESPONSE';
export const SET_ERROR = 'SET_ERROR';
export const SET_USER = 'SET_USER';
export const TOGGLE_LEFT_NAV = 'TOGGLE_LEFT_NAV';

// action creators
export const apiRequest = data => {
	return {type: API_REQUEST, data}
}

export const changeTheme = theme => {
  return {type: CHANGE_THEME, theme}
}

export const toggleLeftNav = () => {
  return {type: TOGGLE_LEFT_NAV}
}

export const registerRequest = data => {
  return {type: REGISTER_REQUEST, data}
}

export const loginRequest = data => {
  return {type: LOGIN_REQUEST, data}
}

export const logout = () => {
  return {type: LOGOUT}
}
