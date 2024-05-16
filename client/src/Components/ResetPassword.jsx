// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import "../App.css";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const {token} = useParams()
 

  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/user/auth/reset-password/" +token, {
      password,
    })
      .then((res) => {
        if (res.data.status) {
        
          navigate("/sign-in");
        }
        console.log(res);
        console.log( res.data.message);
        alert(res.data.message)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Reset password</h1>

        <label htmlFor="password"> New password</label>
        <input
          type="password"
          placeholder="*********"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button type="submit">Reset password</button>

        <div className="to-login-fron-ign-up"></div>
      </form>
    </div>
  );
}

export default ResetPassword;
