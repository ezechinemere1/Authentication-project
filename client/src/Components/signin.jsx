// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function Signin() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/user/auth/sign-in", {

      email,
      password,
    })
      .then((res) => {
        if (res.data.status) {
          navigate("/");
        }
        alert(res.data.message)
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Sign in</h1>
       

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

        <button type="submit">Sign in</button>
           <Link to="/forgot-password"> Forgot Password?</Link>
        <div className="to-login-fron-ign-up">
          <p> Dont Have an account?</p>
          <Link to="/sign-up">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Signin;
