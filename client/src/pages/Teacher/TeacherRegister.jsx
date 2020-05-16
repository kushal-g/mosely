import React,{useState} from 'react'
import app from '../../utils/base'

export default function TeacherLogin() {
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const registerUser = e =>{
        e.preventDefault()
        app.auth().createUserWithEmailAndPassword(email,password)
        .then(user=>app.auth().currentUser.getIdToken())
        .then(token=>console.log(token))
        .catch(e=>{console.log(e)})
    }

    return (
        <div>
            <h1>Register Teacher</h1>
            <form onSubmit={registerUser}>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
