'use client';
import React, { useState,useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    status:false
  });
  const [signIn,setSignIn] = useState({
    email:'',
    password:''
  })

  const [success, setSuccess] = useState(false);
  const [existingUser,setExistingUser] = useState([]);

  const [errors,setErrors] = useState({});
  const [switchForm,setSwitchForm] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleChangesignIn = (e) => {
    const {name,value} = e.target;
    setSignIn(prev => ({
      ...prev,
      [name]:value
    }))
  }
  const validateForm = () => {
    let newErrors = {};
    //username validation
    if(!form.username.trim()){
      newErrors.username = 'Username is required';
    }

    if(!form.email.trim()){
      newErrors.email = "Email is Required";
    }else if(!/^\S+@\S+\.\S+$/.test(form.email)){
      newErrors.email = "Enter a valid email address";
    }

    if(!form.password.trim()){
      newErrors.password = "Password is required";
    }else if(form.password.length < 6){
      newErrors.password = "Password must be at least 6 characters long";
    }

    if(!form.confirmPassword.trim()){
      newErrors.confirmPassword = "Confirm Password is required";
    }else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // true if no errors
  }

  const signUpFormData = async (e) => {
    e.preventDefault();
    if(!validateForm()){
      console.log("Validation failed");
      return;
    }
    console.log("Form data before submit", form);

    try {
      //fetch api call 
      // const response = await fetch('http://localhost:3001/userInfo', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form)
      // });

      // if (response.ok) {
      //   const res = await response.json();
      //   console.log("res", res);

      //   setSuccess(true);
      //   setForm({
      //     username: '',
      //     email: '',
      //     password: '',
      //     confirmPassword: '',
      //     status:false
      //   });

      //   setTimeout(() => setSuccess(false), 3000);

      // } else {
      //   console.error("Server error:", response.statusText);
      //   alert("Failed to submit. Please try again.");
      // }

      //axios api call
      const response = await axios.post("http://localhost:3001/userInfo",form,{
        headers:{'Content-Type':'application/json'},
      })
      console.log("res", response.data);
      setSuccess(true);
      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        status: false,
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      // Axios error handling
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert("Failed to submit. Please try again.");
      } else {
        console.error("Network error:", error);
        alert("Something went wrong. Please check your network connection.");
      }
    }
  };
  const getUserDetails = async () => {
    try{
      const response = await fetch('http://localhost:3001/userInfo',{
        method:'GET',
        headers:{'Content-Type':'application/json'}
      });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      if(response.ok){
        const res = await response.json();
        // console.log("Get userInformation",res);
        setExistingUser(res)
      }
    }catch (error){
      console.error("API request failed:", error.message);
    }
  }
  const signInFormData = async (e) => {
    e.preventDefault();
    await getUserDetails();
    console.log("signInFormData",existingUser);
    let id = ''
    for(let i = 0; i<= existingUser.length-1;i++){
      if(existingUser[i].email === signIn.email && existingUser[i].password === signIn.password){
        setExistingUser(prev => prev.map((user, index) =>
          index === i ? { ...user, status: true } : user
        ))
        id = existingUser[i].id
      }
    }
    console.log("existingUser",existingUser);
    try{
      const response = await fetch(`http://localhost:3001/userInfo/${id}`,{
        method:'PATCH',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({
          status:true
        })
      })
      if(!response.ok){
        throw new Error("Signin Reject");
        return
      }

      const res = await response.json();
      console.log("res",res);
      
    }catch(error){
      console.error("Linking Error",error)
    }
  }
  useEffect(()=>{
    getUserDetails();
  },[])
  return (
    <div>
      <main>
        <Link href="/" className="text-blue-600 hover:underline ml-4">Go to Home</Link>

        <form onSubmit={switchForm ? signInFormData :signUpFormData} className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-5">

          <div className="d-flex justify-content-center gap-3">
            <h5 className={`text-2xl font-semibold text-gray-800 text-center border py-2 px-4 ${switchForm ? 'activeForm bg-dark-subtle' : ''}`} onClick={()=> setSwitchForm(true)}>Sign IN</h5>
            <h5 className={`text-2xl font-semibold text-gray-800 text-center border py-2 px-4 ${!switchForm ? 'activeForm bg-dark-subtle' : ''}`} onClick={()=> setSwitchForm(false)}>Sign Up</h5>
            
          </div>

          {success && (
            <div className="text-green-600 text-center font-medium bg-green-50 border border-green-200 rounded-lg py-2 transition-opacity duration-500">
              ✅ Message sent successfully!
            </div>
          )}
          {
            switchForm ? (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={signIn.email}
                    onChange={handleChangesignIn}
                    placeholder="Enter your email"
                    
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="error text-danger"><small>{errors.email}</small></p>}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={signIn.password}
                    onChange={handleChangesignIn}
                    placeholder="Password"
                    
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.password && <p className="error text-danger"><small>{errors.password}</small></p>}
                </div>
              </>
            ) : (
              <>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.username && <p className="error text-danger"><small>{errors.username}</small></p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="error text-danger"><small>{errors.email}</small></p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && <p className="error text-danger"><small>{errors.password}</small></p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirmPassword && (
                <p className="error text-danger"><small>{errors.confirmPassword}</small></p>
              )}
              </div>
              </>
            )
          }
          

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            {switchForm ? 'Sign In' : 'Sign Up'}
          </button>

        </form>
      </main>
    </div>
  );
}
