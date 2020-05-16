import React,{useState} from 'react'
import app from '../../utils/base'

export default function TeacherLogin() {
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const registerUser = e =>{
        e.preventDefault()
        app.auth().createUserWithEmailAndPassword(email,password)
        .then(user=>app.auth().currentUser.getIdToken())
        .then(token=>fetch(`${process.env.REACT_APP_URL}/teacher/create`,{
            method:'post',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }))
        .then(response=>response.json())
        .then(body=>console.log(body))
        .catch(e=>{console.log(e)})
    }

    return (
        <div>
            <h1>Register Teacher</h1>
            <form onSubmit={registerUser}>
                <div>
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
