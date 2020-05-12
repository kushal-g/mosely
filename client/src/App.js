import React from 'react';
import {Route} from 'react-router-dom';
import FormPage from './pages/FormPage';

function App() {
  return (
    <div className="App">
    <h1> Moss Website for Plagarism Check</h1>
      <Route exact path="/" component={FormPage} />
    </div>
  );
}

export default App;
