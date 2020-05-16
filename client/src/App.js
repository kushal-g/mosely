import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import {AuthProvider} from './context/Auth'

import TeacherRegister from './pages/Teacher/TeacherRegister';
import LandingPage from './pages/LandingPage';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/teacher/register" component={TeacherRegister} />
          <Route exact path="/" component={LandingPage} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
