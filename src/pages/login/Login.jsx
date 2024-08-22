import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { signUp } from "../../config/fireBase";

export const Login = () => {

  const[currentState,setCurrentState]=useState("Sign up")
  const [userName,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const onSubmitHandler=(event)=>{
    event.preventDefault();
    if(currentState==="Sign up"){
      signUp(userName,email,password);
    }
    console.log(userName,email,password)
  }



  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currentState}</h2>
        {currentState ==="Sign up"?<input onChange={(e)=>setUsername(e.target.value)} value={userName} type="text" placeholder='username' className="form-input" required />:null}
        <input  onChange={(e)=>setEmail(e.target.value)} value={email} type="email"  placeholder='email' className="form-input" />
        <input  onChange={(e)=>setPassword(e.target.value)} value={password} type="password"  placeholder='password' className="form-input" />
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
