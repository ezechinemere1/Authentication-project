// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'



function Dashboard() {
     const Navigate = useNavigate()
     axios.defaults.withCredentials = true

useEffect( () =>{
axios.get("http://localhost:3000/user/auth/verify").then(
    res =>{
        if (res.data.status){ /* empty */ }else{
            Navigate('/')
        }
    }
)
},[Navigate])

  return (
    <div>       
    <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
