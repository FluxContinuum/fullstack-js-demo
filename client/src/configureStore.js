import { throttle } from 'lodash';
import { createLogger } from 'redux-logger';
//import authMiddleware from './middleware/auth';
//import { apiMiddleware } from 'redux-api-middleware';
import createSagaMiddleware from 'redux-saga';
//import { socketInit, emit } from './configureSocket';
import { loadState, saveState } from './stateStorage';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas';

export const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	// authMiddleware and redux-api-middleware both replaced by sagas
	const middleware = [
		sagaMiddleware,
	//	authMiddleware,
  //  apiMiddleware
  ];

  // use redux logger in development
	if (process.env.NODE_ENV !== 'production') {
	  middleware.push(createLogger());
	}

	// load persistent state
	const persistedState = loadState();
	const store = createStore(rootReducer, persistedState, applyMiddleware(...middleware));
	console.log('Store created with state: ', store.getState());
//	socketInit(store);

	sagaMiddleware.run(rootSaga);

	// persisting pieces of state to localStorage
	// called every time an action is dispatched -- lodash throttle ensuring it only gets called at most once per second
	store.subscribe(throttle(() => {
		saveState({
			theme: store.getState().theme,
			user: store.getState().user
		});
	}, 1000));

	return store;
};