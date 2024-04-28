import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';


const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }
  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-lg bg-white text-black  border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p-2'>
              <span className='text-black text-lg label-text'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full bg-slate-300 text-black input input-bordered h-10'
              type="text"
              placeholder='Full Name' />
          </div>
          <div>
            <label className='label  p-2'>
              <span className='text-black text-lg label-text'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full bg-slate-300 text-black  input input-bordered h-10'
              type="text"
              placeholder='Username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-black text-lg label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full bg-slate-300 text-black  input input-bordered h-10'
              type="password"
              placeholder='Password' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-black text-lg label-text'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full bg-slate-300 text-black  input input-bordered h-10'
              type="password"
              placeholder='Confirm Password' />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox mx-2 border border-black" />
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox border border-black mx-2" />
            </div>
          </div>
          <p className='text-center my-2 hover:text-blue-700'>Already have an account? <Link to="/login" > Login </Link></p>
          <div>
            <button type='submit' className='btn text-white bg-blue-500 hover:bg-blue-700 btn-block btn-sm mt-2 border border-slate-700'>Singup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup