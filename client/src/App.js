import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Root from './pages/Root/Root';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Route exact path="/" component={Root} />
			</div>
		</BrowserRouter>
	);
}

export default App;
