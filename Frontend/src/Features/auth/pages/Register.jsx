import { Link } from 'react-router';
import React, { useState } from 'react';
import { useauth } from '../Hooks/useAuth';
import { useNavigate } from 'react-router';
import { register } from '../service/auth.api';

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { loading, handleRegister } = useauth()

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      await handleRegister({ username, email, password })
      navigate('/')
    }
    catch (err) {
      console.log(err)
    }
  }

  if (loading) {
    return (<main className="min-h-screen bg-[#0d0e12] flex items-center justify-center"><h1 className="text-white text-xl font-semibold tracking-wider animate-pulse">Loading......</h1></main>)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0e12] px-4 antialiased font-sans">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-[#14161d] border border-gray-800/60 p-8 shadow-2xl">

        {/* Header Block */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Create <span className="text-[#ec4899]">Account</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400 font-medium">
            Join us to get started with your account
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handlesubmit} className="mt-6 space-y-5">
          <div className="space-y-4">

            {/* Username Input Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 tracking-wide uppercase">
                Username
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg bg-[#1a1d26] border border-gray-800 px-3 py-2.5 text-gray-200 placeholder-gray-600 shadow-sm focus:border-[#ec4899] focus:outline-none focus:ring-1 focus:ring-[#ec4899] text-sm transition-all duration-200"
                placeholder="harshal_dev"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
              />
            </div>

            {/* Email Input Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 tracking-wide uppercase">
                Email Address
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-lg bg-[#1a1d26] border border-gray-800 px-3 py-2.5 text-gray-200 placeholder-gray-600 shadow-sm focus:border-[#ec4899] focus:outline-none focus:ring-1 focus:ring-[#ec4899] text-sm transition-all duration-200"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </div>

            {/* Password Input Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 tracking-wide uppercase">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full rounded-lg bg-[#1a1d26] border border-gray-800 px-3 py-2.5 text-gray-200 placeholder-gray-600 shadow-sm focus:border-[#ec4899] focus:outline-none focus:ring-1 focus:ring-[#ec4899] text-sm transition-all duration-200"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-start text-xs font-medium">
            <input
              id="terms"
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 rounded border-gray-800 bg-[#1a1d26] text-[#ec4899] focus:ring-[#ec4899] focus:ring-offset-[#14161d] checked:bg-[#ec4899]"
            />
            <label htmlFor="terms" className="ml-2 block text-gray-400 leading-normal select-none">
              I agree to the{' '}
              <a href="#" className="font-semibold text-[#ec4899] hover:text-[#db2777] transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-semibold text-[#ec4899] hover:text-[#db2777] transition-colors">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-[#ec4899] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-500/10 hover:bg-[#db2777] active:scale-[0.99] focus:outline-none transition-all duration-150 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Redirect Link */}
        <p className="text-center text-xs font-medium text-gray-500 pt-2 border-t border-gray-800/40">
          Already have an account?{' '}
          <Link to="/Login" className="font-bold text-[#ec4899] hover:text-[#db2777] transition-colors ml-1">
            Sign in here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;