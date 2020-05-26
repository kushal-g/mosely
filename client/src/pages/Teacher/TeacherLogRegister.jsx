import React,{useState} from 'react'
import app from '../../utils/base'
import "./TeacherLogRegister.css"

export default function TeacherLogin() {

    function Change(){
        document.querySelector('.teacherLogRegister_cont').classList.toggle('s--signup');
   
    }

    const [name, setName] = useState("")
    const [mossid, setMossId] = useState("")
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
            if(body.data.role.teacher){
                app.auth().signInWithEmailAndPassword(loginEmail,loginPassword)
                .then(user=>app.auth().currentUser.getIdToken())
                .then(result=>console.log(result))
            }
        }).catch(e=>console.log(e))
    }

     const registerUser = e =>{

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
                mossId:mossid
            })
        }))
        .then(response=>response.json())
        .then(body=>console.log(body))
        .catch(e=>{console.log(e)})
    } 

    return <div>
    <div className="teacherLogRegister_cont">
      <div className="teacherLogRegister_form sign-in" >
        <h2 className="teacherLogRegister_Landing-center">Welcome back</h2>
        <label className="teacherLogRegister_label">
          <span className="teacherLogRegister_span">Email</span>
          <input className="teacherLogRegister_input" type="email"  value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/>
        </label>
        <label className="teacherLogRegister_label">
          <span className="teacherLogRegister_span">Password</span>
          <input className="teacherLogRegister_input" type="password"  value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}/>
        </label>
        <p className="teacherLogRegister_forgot-pass"><a href="#">Forgot password?</a></p>
        <button onClick={signIn} type="button" className="teacherLogRegister_submit">Sign In</button>
      </div>
      <div className="teacherLogRegister_sub-cont">
        <div className="teacherLogRegister_img">
          <div className="teacherLogRegister_img__text m--up">
            <h2 className="teacherLogRegister_h2">New here?</h2>
            <p>Sign up and get access to our complete solution for class management!</p>
          </div>
          <div className="teacherLogRegister_img__text m--in">
            <h2 className="teacherLogRegister_h2">One of us?</h2>
            <p>If you already has an account, just sign in. We've missed you!</p>
          </div>
          <div className="teacherLogRegister_img__btn" onClick={Change}>
            <span  className="teacherLogRegister_span m--up">Sign Up</span>
            <span className="teacherLogRegister_span m--in">Sign In</span>
          </div>
        </div>
        <div className="teacherLogRegister_form sign-up">
          <h2 className="teacherLogRegister_h2">Time to feel like home</h2>
          <label className="teacherLogRegister_label">
            <span className="teacherLogRegister_span">Name</span>
            <input className="teacherLogRegister_input"  value={name} onChange={e=>setName(e.target.value)}type="text" />
          </label>
          <label className="teacherLogRegister_label">
            <span className="teacherLogRegister_span">MOSS-ID</span>
            <input className="teacherLogRegister_input"  value={mossid} onChange={e=>setMossId(e.target.value)}type="text" />
          </label>
          <label className="teacherLogRegister_label">
            <span className="teacherLogRegister_span">Email</span>
            <input className="teacherLogRegister_input"  value={signUpEmail} onChange={e=>setSignUpEmail(e.target.value)}type="email" />
          </label>
          <label className="teacherLogRegister_label">
            <span className="teacherLogRegister_span">Password</span>
            <input className="teacherLogRegister_input" type="password"  value={signUpPassword} onChange={e=>setSignUpPassword(e.target.value)} />
          </label>
          <button onClick={registerUser}type="button" className="teacherLogRegister_submit">Sign Up</button>

        </div>
      </div>
    </div>
  </div>

    }
