import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import {AuthProvider} from './context/Auth'

import TeacherRegister from './pages/Teacher/TeacherRegister';
import LandingPage from './pages/LandingPage';
import TeacherLogin from './pages/Teacher/TeacherLogin';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/teacher/register" component={TeacherRegister} />
          <Route exact path="/teacher/login" component={TeacherLogin} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
