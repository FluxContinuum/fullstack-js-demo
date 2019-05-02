import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Provider store={configureStore()}>
		<BrowserRouter>
			<Root />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
