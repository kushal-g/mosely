import React from 'react'
import "./PopUp.css"
export default function MessagePopUp(props) {

    return (
        <div>
            <div className="backgroundArea" onClick={()=>props.setViewMessage(false)}>
            </div>
             <div className="popMoss">
                    <h1>{props.message}</h1>
				 <div style={{textAlign:"center"}}><button type="submit" onClick={()=>props.setViewMessage(false)}>Close</button></div>
			</div>
        </div>
    )
}
