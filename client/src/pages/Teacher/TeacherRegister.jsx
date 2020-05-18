import React,{useState} from 'react'
import app from '../../utils/base'

export default function TeacherLogin() {
    const [name, setName] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mossId, setMossId] = useState("")
    

    const registerUser = e =>{
        e.preventDefault()
        app.auth().createUserWithEmailAndPassword(email,password)
        .then(user=>app.auth().currentUser.getIdToken())
        .then(token=>fetch(`${process.env.REACT_APP_URL}/teacher/create`,{
            method:'post',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                name:name,
                mossId:mossId
            })
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
                    <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
                </div>
                <div>
                    <input type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <input type="text" placeholder="Moss ID" value={mossId} onChange={e=>setMossId(e.target.value)}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
