import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
const [username, setusername] = useState('')
const [email, setemail] = useState('')
const [password, setpassword] = useState('')
async function handleFormsubmit(e){
  e.preventDefault();


}

  return (
<main>
  <div className="form-container">
    <h1>Register</h1>
    <form onSubmit={handleFormsubmit}>
      <input onInput={(e)=>{
       setusername(e.target.value)
      }}
      type='text'
       name='username'
       placeholder='Enter Username'  required/>
      <input onInput={(e)=>{
        setemail(e.target.value)
      }}
       type='email'
        name='email'
         placeholder='Enter email' required/>
      <input onInput={(e)=>{
        setpassword(e.target.value)
      }}
      type='password' 
      name='password' 
      placeholder='Enter password' required />
      <button type='submit' >Register</button>
  
<p> Already have an account? <Link  className='toogleform' to='/login'  > Login </Link></p>
  </form>
  </div>
</main>
  )
}

export default Register