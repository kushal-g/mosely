import React, { useState, useContext } from 'react'
import TeacherLogRegister from "../Teacher/TeacherLogRegister"
import "./LandingPage.css"

function LandingPage(){

  const [tabSelected,setTabSelected]=useState("student");
  
  return (
    <div className="landingPage_container landingPage_center">
    <nav className="landingPage_menu">
        <h1 className="landingPage_menu__logo">mosely</h1>

        <div className="landingPage_menu__right">
            <ul className="landingPage_menu__list">
            <li className="landingPage_menu__list-item"><a class={`landingPage_menu__link ${tabSelected=="teacher"?"landingPage_menu__link--active":""}`}  onClick={e=>setTabSelected("teacher")}>Teacher</a></li>
            <li className="landingPage_menu__list-item"><a class={`landingPage_menu__link ${tabSelected=="student"?"landingPage_menu__link--active":""}`} onClick={e=>setTabSelected("student")}>Student</a></li>
            </ul>
        </div>
        
    </nav>
    {tabSelected=="student"?<div></div>:<TeacherLogRegister />}
</div>

);
}

export default LandingPage;