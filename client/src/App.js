import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import TeacherPanel from "./pages/Teacher/TeacherPanel/TeacherPanel"
import {AuthProvider} from './context/Auth'
import PrivateTeacherRoute from "./components/PrivateTeacherRoute"
import PrivateStudentRoute from "./components/PrivateStudentRoute"
import "./App.css"
import StudentHome from "./pages/Student/StudentHome/StudentHome"
import LandingPage from './pages/LandingPage/LandingPage';
import TeacherCourses from './pages/Teacher/TeacherCourses/TeacherCourses';
import TeacherClassPage from './pages/Teacher/TeacherClass/TeacherClassPage';
import TeacherReports from "./pages/Teacher/TeacherReports/TeacherReports"
import TeacherHome from "./pages/Teacher/TeacherHome/TeacherHome"
import TeacherClassAssignment from "./pages/Teacher/TeacherAssignment/TeacherClassAssignment"
import StudentAssignment from "./pages/Student/StudentAssignment/StudentAssignment"

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
          <PrivateTeacherRoute exact path="/teacher/dashboard/class/assignment" component={TeacherClassAssignment} />
          <PrivateStudentRoute exact path="/student/dashboard" component={StudentHome}/>
          <PrivateStudentRoute exact path="/student/dashboard/assignment" component={StudentAssignment}/>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
