import React,{useState} from 'react'
import app from '../../utils/base'
import "./StudentLogRegister.css"

export default function StudentLogin() {

    function Change(){
        document.querySelector('.studentLogRegister_cont').classList.toggle('s--signup');
   
    }

    const [name, setName] = useState("")
    const [usn, setUSN] = useState("")
    const [loginEmail,setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [signUpEmail,setSignUpEmail] = useState("")
    const [signUpPassword, setSignUpPassword] = useState("")

    

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
            if(body.data.role.student){
                app.auth().signInWithEmailAndPassword(loginEmail,loginPassword)
                .then(user=>app.auth().currentUser.getIdToken())
                .then(result=>console.log(result))
            }
        }).catch(e=>console.log(e))
    }

     const registerUser = e =>{

        app.auth().createUserWithEmailAndPassword(signUpEmail,signUpPassword)
        .then(user=>app.auth().currentUser.getIdToken())
        .then(token=>fetch(`${process.env.REACT_APP_URL}/student/create`,{
            method:'post',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                name:name,
                usn:usn
            })
        }))
        .then(response=>response.json())
        .then(body=>console.log(body))
        .catch(e=>{console.log(e)})
    } 

    return <div>
    <div className="studentLogRegister_cont">
      <div className="studentLogRegister_form sign-in" >
        <h2 className="studentLogRegister_Landing-center">Welcome back,</h2>
        <label className="studentLogRegister_label">
          <span className="studentLogRegister_span">Email</span>
          <input className="studentLogRegister_input" type="email"  value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/>
        </label>
        <label className="studentLogRegister_label">
          <span className="studentLogRegister_span">Password</span>
          <input className="studentLogRegister_input" type="password"  value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}/>
        </label>
        <p className="studentLogRegister_forgot-pass"><a href="#">Forgot password?</a></p>
        <button onClick={signIn} type="button" className="studentLogRegister_submit">Sign In</button>
      </div>
      <div className="studentLogRegister_sub-cont">
        <div className="studentLogRegister_img">
          <div className="studentLogRegister_img__text m--up">
            <h2 className="studentLogRegister_h2">New here?</h2>
            <p>Sign up and get ready to solve problems!</p>
          </div>
          <div className="studentLogRegister_img__text m--in">
            <h2 className="studentLogRegister_h2">One of us?</h2>
            <p>If you already has an account, just sign in. We've missed you!</p>
          </div>
          <div className="studentLogRegister_img__btn" onClick={Change}>
            <span  className="studentLogRegister_span m--up">Sign Up</span>
            <span className="studentLogRegister_span m--in">Sign In</span>
          </div>
        </div>
        <div className="studentLogRegister_form sign-up">
          <h2 className="studentLogRegister_h2">Welcome, Stranger</h2>
          <label className="studentLogRegister_label">
            <span className="studentLogRegister_span">Name</span>
            <input className="studentLogRegister_input"  value={name} onChange={e=>setName(e.target.value)}type="text" />
          </label>
          <label className="studentLogRegister_label">
            <span className="studentLogRegister_span">USN</span>
            <input className="studentLogRegister_input"  value={usn} onChange={e=>setUSN(e.target.value)}type="text" />
          </label>
          <label className="studentLogRegister_label">
            <span className="studentLogRegister_span">Email</span>
            <input className="studentLogRegister_input"  value={signUpEmail} onChange={e=>setSignUpEmail(e.target.value)}type="email" />
          </label>
          <label className="studentLogRegister_label">
            <span className="studentLogRegister_span">Password</span>
            <input className="studentLogRegister_input" type="password"  value={signUpPassword} onChange={e=>setSignUpPassword(e.target.value)} />
          </label>
          <button onClick={registerUser}type="button" className="studentLogRegister_submit">Sign Up</button>

        </div>
      </div>
    </div>
  </div>

    }
