import React from 'react'
import { useContext, useState ,useEffect} from 'react';
import { AuthContext } from '../../context/Auth';

import "./PopUp.css"
export default function PopUp(props) {
 
    const { currentUser, loading } = useContext(AuthContext);

    const [mossId,setMossId]=useState("");
    async function getMossId()
    {
        const token = await currentUser.getIdToken();
		const result = await fetch(`${process.env.REACT_APP_URL}/moss/id/read`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
		});

		const body = await result.json();
        setMossId(body.data.mossId);
        // return mossId;
        console.log(mossId);
    }
    async function updateMossId()
    {
        const token = await currentUser.getIdToken();
		const result = await fetch(`${process.env.REACT_APP_URL}/moss/id/update`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
            },
            body:JSON.stringify({
				mossId: mossId,
			}),
		});

		const body = await result.json();
        console.log(body);
        props.setViewMoss(false);
        props.setViewMessage(true);
        if(body.statusCode==200)
         props.setConfirmMessage("Updated Succesfully!");
        else
          props.setConfirmMessage("Invalid Moss Id/Failed Update")
    }
    useEffect(() => {
        getMossId();        
    }, [currentUser])
    return (
        <div>
            <div className="backgroundArea" onClick={()=>props.setViewMoss(false)}>
            </div>
             <div className="popMoss">
				 <h1>Your MOSS ID is : <input type="text" onChange={event=>setMossId(event.target.value)} value={mossId}/></h1>
				 <div style={{textAlign:"center"}}><button type="submit" onClick={updateMossId}>Update Moss Id</button></div>
			</div>
        </div>
    )
}
