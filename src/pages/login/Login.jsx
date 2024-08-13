import React from "react";
import "./Login.css";
import assets from "../../assets/assets";

export const Login = () => {
  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login-form">
        <h2>Sign Up</h2>
        <input type="text" placeholder='username' className="form-input" required />
        <input type="email"  placeholder='email' className="form-input" />
        <input type="password"  placeholder='password' className="form-input" />
        <button type="submit">Sign Up</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to our privacy and policy</p>
        </div>
        <div className="login-forgot">
          <p className="login-toggle">Already Have an account <span>click here</span> </p>
        </div>
      </form>
    </div>
  );
};
