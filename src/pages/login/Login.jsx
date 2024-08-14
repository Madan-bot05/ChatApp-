import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";

export const Login = () => {

  const[currentState,setCurrentState]=useState("Sign up")



  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login-form">
        <h2>{currentState}</h2>
        {currentState ==="Sign up"?<input type="text" placeholder='username' className="form-input" required />:null}
        <input type="email"  placeholder='email' className="form-input" />
        <input type="password"  placeholder='password' className="form-input" />
        <button type="submit">{currentState==="Sign up"?"Create account":"Login now"}</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to our privacy and policy</p>
        </div>
        <div className="login-forgot">
          {
            currentState==="Sign up"?
            <p className="login-toggle">Already Have an account <span onClick={()=>setCurrentState("Login")}>click here</span> </p>
            :<p className="login-toggle">Create An Account<span onClick={()=>setCurrentState("Sign up")}>Click here</span> </p>
          }
        </div>
      </form>
    </div>
  );
};
