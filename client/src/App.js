import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import {AuthProvider} from './context/Auth'
import TeacherLogRegister from "./pages/Teacher/TeacherLogRegister"
import "./App.css"
import LandingPage from './pages/LandingPage/LandingPage';
import PrivateTeacherRoute from './components/PrivateTeacherRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
