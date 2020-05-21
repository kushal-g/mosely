import React,{useState} from 'react'
import app from '../../utils/base'
import "./TeacherLogRegister.css"

export default function TeacherLogin() {

    function Change(){
        document.querySelector('.cont').classList.toggle('s--signup');
   
    }

    const [name, setName] = useState("")
    const [loginEmail,setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [signUpEmail,setSignUpEmail] = useState("")
    const [signUpPassword, setSignUpPassword] = useState("")
    const [mossId, setMossId] = useState("")
    

    const signIn = e =>{
        e.preventDefault()
        fetch(`${process.env.REACT_APP_URL}/role`,{
            method:'post',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                email:loginEmail
            })
        }).then(response=>response.json())
        .then(body=>{
            if(body.data.role.teacher){
                app.auth().signInWithEmailAndPassword(loginEmail,loginPassword)
                .then(user=>app.auth().currentUser.getIdToken())
                .then(result=>console.log(result))
            }
        }).catch(e=>console.log(e))
    }

     const registerUser = e =>{
        e.preventDefault()
        app.auth().createUserWithEmailAndPassword(signUpEmail,signUpPassword)
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

    return <div>
    <h1>mosely</h1>
    <div className="cont">
      <div className="form sign-in" >
        <h2 className="Landing-center">Welcome back,</h2>
        <label>
          <span>Email</span>
          <input type="email"  value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/>
        </label>
        <label>
          <span>Password</span>
          <input type="password"  value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}/>
        </label>
        <p className="forgot-pass"><a href="#">Forgot password?</a></p>
        <button onClick={signIn} type="button" className="submit">Sign In</button>
      </div>
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h2>New here?</h2>
            <p>Sign up and get ready to solve problems!</p>
          </div>
          <div className="img__text m--in">
            <h2>One of us?</h2>
            <p>If you already has an account, just sign in. We've missed you!</p>
          </div>
          <div className="img__btn" onClick={Change}>
            <span  className="m--up">Sign Up</span>
            <span className="m--in">Sign In</span>
          </div>
        </div>
        <div className="form sign-up">
          <h2>Time to feel like home,</h2>
          <label>
            <span>Name</span>
            <input  value={name} onChange={e=>setName(e.target.value)}type="text" />
          </label>
          <label>
            <span>Email</span>
            <input  value={signUpEmail} onChange={e=>setSignUpEmail(e.target.value)}type="email" />
          </label>
          <label>
            <span>MOSS Id</span>
            <input type="text"  value={mossId} onChange={e=>setMossId(e.target.value)}/>
          </label>
          <label>
            <span>Password</span>
            <input type="password"  value={signUpPassword} onChange={e=>setSignUpPassword(e.target.value)} />
          </label>
          <button onClick={registerUser}type="button" className="submit">Sign Up</button>

        </div>
      </div>
    </div>
  </div>

    }
