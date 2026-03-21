import React, { useState } from 'react'
import { Link  ,Navigate,useNavigate} from 'react-router-dom'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'
const Login = () => {
const [email, setemail] = useState("")
const [password, setpassword] = useState('')
const user  =  useSelector(state => state.auth.user)
const loading  =  useSelector(state => state.auth.loading)
const { handleLogin } = useAuth()
  const navigate =  useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()

   const payload ={
    email , password
   }

   await handleLogin(payload)
    // Add authentication logic here
const result = await handleLogin(payload)

    if (result) {
        navigate('/')   // ✅ only after success
    }
  }

  if(!loading && user){
    return <Navigate to="/"  replace />
  }
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 bg-opacity-95 rounded-lg shadow-[0_20px_40px_rgba(15,23,42,0.75)] p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              
              onChange={(e)=>{
                setemail(e.target.value)
              }}
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              
              onChange={(e)=>{
                setpassword(e.target.value)
              }}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-300 text-center">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-emerald-400 hover:text-emerald-200 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login