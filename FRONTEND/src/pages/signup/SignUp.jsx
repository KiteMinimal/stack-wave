import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3000/api/v1/signup', {
      username,
      email,
      password,
      avatar
    })
    .then((res) => {
      console.log(res)
      const data = res.data
      localStorage.setItem('token', data.token)
      navigate('/')
    })
    .catch((err) => {
      setError(err.response.data.message)
    })

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src="/logo.png"
            alt="StackWave Logo"
            className="w-24 mx-auto mb-3"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            Create a StackWave Account
          </h2>
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              name="username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Avatar
            </label>
            <input
              onChange={(e) => setAvatar(e.target.value)}
              value={avatar}
              type="text"
              name="avatar"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your avatar image url"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            {" "}
            Sign in
          </Link>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default SignUp;
