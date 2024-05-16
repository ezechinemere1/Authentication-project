// eslint-disable-next-line no-unused-vars
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Home() {
  const Navigate = useNavigate();
   axios.defaults.withCredentials = true

  const handleLogOut = () =>{
axios.get("http://localhost:3000/user/auth/logout").then(res =>{
  if(res.data.status){ Navigate('/sign-in')}
}).catch ((error) =>{
  console.log(error)
}) 

  }
  return (
    <div>
      <h1>Home</h1>
      <Link to="/dashboard">Dashboard</Link>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Home
