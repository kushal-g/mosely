import React,{useState,useContext} from 'react'
import app from '../../utils/base'
import { AuthContext } from '../../context/Auth'

export default function TeacherLogin() {
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const signIn = e =>{
        e.preventDefault()
        fetch(`${process.env.REACT_APP_URL}/role`,{
            method:'post',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                email:email
            })
        }).then(response=>response.json())
        .then(body=>{
            if(body.data.role.teacher){
                app.auth().signInWithEmailAndPassword(email,password)
                .then(user=>app.auth().currentUser.getIdToken())
                .then(result=>console.log(result))
            }
        }).catch(e=>console.log(e))
    }
    return (
        <div>
            <h1>Teacher Login</h1>
            <form onSubmit={signIn}>
                <div>
                    <input type="email" onChange={e=>setEmail(e.target.value)}/>   
                </div>
                <div>
                    <input type="password" onChange={e=>setPassword(e.target.value)}/>
                </div>
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}
