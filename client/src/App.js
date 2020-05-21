import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import {AuthProvider} from './context/Auth'
import TeacherLogRegister from "./pages/Teacher/TeacherLogRegister"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={TeacherLogRegister} />
        
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
