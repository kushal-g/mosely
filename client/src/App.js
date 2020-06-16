import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import TeacherPanel from "./pages/Teacher/TeacherPanel/TeacherPanel"
import {AuthProvider} from './context/Auth'
import PrivateTeacherRoute from "./components/PrivateTeacherRoute"
import "./App.css"
import LandingPage from './pages/LandingPage/LandingPage';
import TeacherCourses from './pages/Teacher/TeacherCourses/TeacherCourses';
import TeacherClassPage from './pages/Teacher/TeacherClass/TeacherClassPage';
import TeacherReports from "./pages/Teacher/TeacherReports/TeacherReports"
import TeacherHome from "./pages/Teacher/TeacherHome/TeacherHome"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          <PrivateTeacherRoute exact path="/teacher/dashboard" component={TeacherHome}/>
          <PrivateTeacherRoute exact path="/teacher/dashboard/courses" component={TeacherCourses}/>
          <PrivateTeacherRoute exact path="/teacher/dashboard/reports" component={TeacherReports}/>
          <PrivateTeacherRoute exact path="/teacher/dashboard/classes" component={TeacherClassPage}/>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
