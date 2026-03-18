import React, { useState } from 'react'
import "../style/register.scss"
import Formgroup from '../component/Formgroup'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
const Resgister = () => {
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
    const  {  loading  , handleRegister} =  useAuth()
  const navigate =  useNavigate()
  async function handlesubmit(e){
    e.preventDefault()
    await handleRegister(username , email , password)
    navigate('/')
  }

  return (
    <main className='register-page'>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handlesubmit}>
          <Formgroup 
          value={username}
          onchange={(e)=> setusername(e.target.value)}
          label="Username" placeholder="Enter your username" />
          <Formgroup
           value={email}
          onchange={(e)=> setemail(e.target.value)}
           label="Email" placeholder="Enter your email" />
          <Formgroup 
           value={password}
          onchange={(e)=> setpassword(e.target.value)}
          label="Password" placeholder="Enter your password" />
          <button type='submit' className='button'>Register</button>
        </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Resgister