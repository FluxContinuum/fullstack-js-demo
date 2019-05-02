import { fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';

// helpers
const handleError = response => {
	if (response.error){
		throw new Error(response.message);
	}
	return response;
}

const apiFetch = (method, endpoint, data, headers={}) => {
	const options = {
		method: method,
		headers: {
			...headers,
			'content-type': 'application/json'
		}
	}

	let request;

	if(method === 'GET'){
		request = fetch(endpoint, options);
	}else if (method === 'POST'){
		request = fetch(endpoint, { ...options, body: JSON.stringify(data) });
	}

	return request.then(res => res.json()).then(handleError);
}

// selectors
const getToken = state => state.user && state.user.at ? state.user.at : null;

// handle generic API requests
export function* apiRequest(action) {
	yield put({type: actions.IS_LOADING});
	const token = yield select(getToken);
	const { method, endpoint, body } = action.data;

	try {
		const response = yield apiFetch(method, endpoint, body, { 'Authorization': `Bearer ${token}` });
		yield put({ type: actions.SET_API_RESPONSE, payload: response });
	} catch(e) {
		yield put({ type: actions.SET_ERROR, message: e.message });
	}
}

/* Effect handling auth
	action.data should contain username and password */
export function* loginUser(action) {
	yield put({type: actions.IS_LOADING});

	const { provider } = action.data;
	let endpoint = '/users/login';

	if (provider){
		endpoint = `${endpoint}/${provider}`;
	}

	try {
		const user = yield apiFetch('POST', endpoint, action.data);
		yield put({type: actions.SET_USER, user: user});
	} catch(e) {
		yield put({type: actions.SET_ERROR, message: e.message});
	}
}

/* Effect handling registration
	action.data should contain username, email, and password */
export function* registerUser(action) {
	yield put({type: actions.IS_LOADING});

	try {
		const user = yield apiFetch('POST', '/users/register', action.data);
		yield put({type: actions.SET_USER, user: user});
	} catch(e) {
		yield put({type: actions.SET_ERROR, message: e.message});
	}
}

// Effect logging out current user
export function* logoutUser() {
	try {
		yield put({type: actions.SET_USER, user: null});
	} catch(e) {
		yield put({type: actions.SET_ERROR, message: e.message});
	}
}

// Sagas listening for actions
export function* watchAPIRequest() {
	yield takeEvery(actions.API_REQUEST, apiRequest);
}

export function* watchLogin() {
	yield takeLatest(actions.LOGIN_REQUEST, loginUser);
}

export function* watchLogout() {
	yield takeLatest(actions.LOGOUT, logoutUser);
}

export function* watchRegistration() {
	yield takeLatest(actions.REGISTER_REQUEST, registerUser);
}

export default function* rootSaga() {
	yield fork(watchAPIRequest);
	yield fork(watchLogin);
	yield fork(watchLogout);
	yield fork(watchRegistration);
}