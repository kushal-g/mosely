import React from 'react'
import "./PopUp.css"
export default function PopUp(props) {
    return (
        <div>
            <div className="backgroundArea" onClick={()=>props.setViewMoss(false)}></div>
             <div className="popMoss">
				 <h1>Your MOSS ID is : <input type="text" value="23456789"/></h1>
				 <div style={{textAlign:"center"}}><button>Update Moss Id</button></div>
			</div>
        </div>
    )
}
