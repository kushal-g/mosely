import React from "react";
import {PlusIcon} from 'react-line-awesome'
import StudentClass from "./StudentClass";
import "./StudentHome.css"
import StudentAddClass from "./StudentAddClass"
import { useState } from "react";


function StudentHome(props){

    const [showAddClass,setShowAddClass]=useState(false);

    return <div className="studentHomeContainer">
         <div className="studentPanel_container studentPanel_center">
            <nav className="studentPanel_menu">
                <h1 className="studentPanel_menu__logo">mosely</h1>

                <div className="studentPanel_menu__right">
                    <ul className="studentPanel_menu__list">
                    <li className="studentPanel_menu__list-item">
                        <button onClick={()=>setShowAddClass(true)} className="studentPanel_menu__link"><PlusIcon/>Add Class</button></li>
                    </ul>
                </div>
            </nav>
         </div>
       
         {showAddClass && 
                <StudentAddClass 
                offModal={()=>setShowAddClass(false)}
                user={props.user}/>}
      
      <div className="registeredClass">
          <h2><p>Registered Classes</p></h2>
          <StudentClass/>
      </div>
    </div>
}
export default StudentHome;