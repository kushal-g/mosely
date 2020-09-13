import React from "react";
import {PlusIcon} from 'react-line-awesome'
import StudentClass from "./StudentClass";
import "./StudentHome.css"

function StudentHome(){
    return <div className="studentHomeContainer">
         <div className="studentPanel_container studentPanel_center">
            <nav className="studentPanel_menu">
                <h1 className="studentPanel_menu__logo">mosely</h1>

                <div className="studentPanel_menu__right">
                    <ul className="studentPanel_menu__list">
                    <li className="studentPanel_menu__list-item"><button className="studentPanel_menu__link"><PlusIcon/>Add Class</button></li>
                    </ul>
                </div>
            </nav>
         </div>
      
      <div className="registeredClass">
          <h2><p>Registered Classes</p></h2>
          <StudentClass/>
      </div>
    </div>
}
export default StudentHome;