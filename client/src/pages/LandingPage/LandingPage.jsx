import React from 'react'
import "./LandingPage.css"

export default function LandingPage() {
    
function Change(){
      document.querySelector('.cont').classList.toggle('s--signup');
 
  }


    return <div>
    <h1>mosely</h1>
    <div className="cont">
      <div className="form sign-in" >
        <h2 className="Landing-center">Welcome back,</h2>
        <label>
          <span>Email</span>
          <input type="email" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" />
        </label>
        <p className="forgot-pass"><a href="#">Forgot password?</a></p>
        <button type="button" className="submit">Sign In</button>
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
            <input type="text" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" />
          </label>
          <label>
            <span>MOSS Id</span>
            <input type="text" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" />
          </label>
          <button type="button" className="submit">Sign Up</button>

        </div>
      </div>
    </div>
  </div>
 
    
}
