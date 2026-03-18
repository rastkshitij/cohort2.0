import React, { useState } from 'react'
import "../style/form.scss"
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../hooks/userAuth'
const Register = () => {
      const {loading , handleRegister} = userAuth()
      const [username, setusername] = useState('')
      const [password, setpassword] = useState('')
      const [email, setemail] = useState('')
      const navigate = useNavigate()
      const handlesubmit = async(e)=>{
      e.preventDefault()
       console.log("REGISTER BUTTON WORKING ✅")
        await handleRegister(username ,email , password)
        navigate('/')
    }
        if(loading){
        return (
            <main>
                <h1>Loading...................</h1>
            </main>
        )
    }
  return (
   <main>
    <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handlesubmit}>
            <input onChange={(e)=>{
                setusername(e.target.value)
            }} 
             type="text"
              name='username'
               id='username'
               placeholder='Enter username'/>
            <input
            onChange={(e)=>{
                setemail(e.target.value)
            }} 
             type="email" 
             name='email' 
             id='email' 
             placeholder='Enter Your email' />
            <input  onChange={(e)=>{
                setpassword(e.target.value)
            }} 
            type="password" 
            name='password' 
            id='password' 
            placeholder='Enter Your Password' />
            <button className='button primary-button' >Register</button>
        </form>
        <p>Allready Have an account? <Link to={"/login"}>Login.</Link></p>
    </div>
</main>
  )
}

export default Register