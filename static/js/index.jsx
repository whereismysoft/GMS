import React from 'react';
import ReactDom from 'react-dom';
import 'babel-polyfill';
import 'whatwg-fetch';

import App from './App'

ReactDom.render(
	<div>
		<App />
	</div>,
	document.getElementById('app')
)