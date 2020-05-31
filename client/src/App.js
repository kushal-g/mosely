import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import TeacherPanel from "./pages/Teacher/TeacherPanel/TeacherPanel"
import {AuthProvider} from './context/Auth'
import PrivateTeacherRoute from "./components/PrivateTeacherRoute"
import "./App.css"
import LandingPage from './pages/LandingPage/LandingPage';
import TeacherCourses from './pages/Teacher/TeacherCourses/TeacherCourses';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          <PrivateTeacherRoute exact path="/teacher/dashboard" component={TeacherPanel}/>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
