import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    axios.post("http://localhost:3000/api/v1/login", {
      email,
      password
    })
    .then((res) => {
      console.log(res);
      
      localStorage.setItem("token", res.data.token)
      navigate("/")
    })
    .catch((err) => {
      console.log(err.response.data.message)
      setError(err.response.data.message)
    })
    
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="StackWave Logo" className="w-24 mx-auto mb-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Sign in to StackWave</h2>
        </div>
        < form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6 text-right">
            <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account? 
          <Link to="/signup" className="text-blue-500 font-semibold hover:underline"> Sign up</Link>
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
