// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { useNavigate,  } from "react-router-dom";


function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/user/auth/forgot-password", {
      email,
    })
      .then((res) => {
        if (res.data.status) {
            alert("Check your email for reset password link")
          navigate("/");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>forgot password</h1>

        <label htmlFor="email">email</label>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button type="submit">Send</button>

        <div className="to-login-fron-ign-up">
       
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
