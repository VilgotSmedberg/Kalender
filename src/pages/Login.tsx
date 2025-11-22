import React from 'react'
import Header from '../components/Header'

function Login() {
  return (
    <>
        <div className='bg-[#242424] h-screen text-white flex justify-center items-center'>
            <Header />
            <div className='w-[400px] h-[500px] bg-[#ada7a722] flex flex-col justify-center items-center'>
                <h1 className='mt-5 text-5xl block'>Login</h1>
                <div className='inputs mt-5'>
                    <input className='bg-white text-black px-4 py-4 rounded mb-4' placeholder='Username' type="text" />
                    <input className='bg-white text-black px-4 py-4 rounded' placeholder='Password' type="password" />
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
