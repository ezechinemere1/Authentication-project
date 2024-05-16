// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import {useNavigate, Link} from "react-router-dom"
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/user/auth/sign-up", {
      username,
      email,
      password,
    }).then((res) => {
  
  if(res.data.status){
        navigate('/sign-in')
  }
      console.log(res);
    }).catch(err =>{

        console.log(err)
    })
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="username">username</label>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label htmlFor="email">email</label>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="*********"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button type="submit">Sign up</button>
       <div className="to-login-fron-ign-up">
         <p>Have an account?</p> 
         <Link to="/sign-in">
         Sign in 
         </Link>
       </div>
      </form>
    </div>
  );
}

export default Signup;
