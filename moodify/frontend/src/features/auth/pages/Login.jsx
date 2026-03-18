import React, { useState } from 'react'
import "../style/login.scss"
import Formgroup from '../component/Formgroup'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const  {  loading  , handleLogin} =  useAuth()
  const navigate =  useNavigate()
   const [email, setemail] = useState("")

   const [password, setpassword] = useState("")
   async function handlesubmit(e) {

    e.preventDefault()
    await handleLogin({email , password})
    navigate("/")
    
   }
  return (
  <main className='login-page'>
    <div className="form-container">
    <h1>Login</h1>
    <form onSubmit={handlesubmit}>
      <Formgroup
  value={email}
  onchange={(e)=> setemail(e.target.value)}
  label="Email"
  placeholder="Enter your email"
/>
       <Formgroup 
         value={password}
       onchange={(e)=> setpassword(e.target.value)}
       label="Password" placeholder="Enter your password" />
      <button type='submit' className='button'>Login</button>
    </form>
    <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  </main>
  )
}

export default Login