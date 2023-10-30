import React from "react";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { BrowserRouter as Link } from 'react-router-dom'
import logo from '../../images/logo.png'
function Login() {
  const handleSubmit = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <img
          src={logo}
          alt="logo"
        />
        <button onClick={handleSubmit} className="btn-login">
          Login/Signup With Google 
        </button>
      </div>
       <div className="login-box">
        
        <input placeholder="Enter Your Username" className="username"></input> 

        <input placeholder="Enter Your Password" className="password"></input>
        <button >
      <Link to ={ `/forgot-password/`}>  Forgot Password?</Link>
        </button>
        <button className="login_btn">Login</button>

        <p className="">
        Create a Account <a href="/sign-up">sign up?</a>
      </p>
       </div>
    </div>
  );
}



export default Login