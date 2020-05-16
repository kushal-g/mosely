import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import {AuthProvider} from './context/Auth'

import TeacherRegister from './pages/Teacher/TeacherRegister';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/teacher/register" component={TeacherRegister} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
