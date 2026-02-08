'use client';
import React,{ useState,useEffect,useCallback } from "react";
import Link from "next/link";
import './css/styles.css';
import { useRouter } from "next/navigation";
import { useDispatch,useSelector } from "react-redux";
import { login } from "./redux/userSlice";

import LoginForm from "./components/LoginForm";

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
    const router = useRouter();
    const loginStore = useDispatch();
    const loginStatus = useSelector(state => state.user.isLoggedIn);
  
    const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    },[]);
    const handleChangesignIn = useCallback((e) => {
      const {name,value} = e.target;
      setSignIn(prev => ({
        ...prev,
        [name]:value
      }))
    },[]);
    const validateForm = () => {
      let newErrors = {};
      //username validation
      if(switchForm){

        if(!signIn.email.trim()){
          newErrors.email = "Email is Required";
        }else if(!/^\S+@\S+\.\S+$/.test(signIn.email)){
          newErrors.email = "Enter a valid email address";
        }
        if(!signIn.password.trim()){
          newErrors.password = "Password is required";
        }else if(signIn.password.length < 6){
          newErrors.password = "Password must be at least 6 characters long";
        }

      }else{
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
        const response = await fetch('http://localhost:3001/userInfo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
  
        if (response.ok) {
          const res = await response.json();
          console.log("res", res);
          
          setSuccess(true);
          setForm({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            status:false
          });
          
          setSignIn({ email: "", password: "" });
  
          setTimeout(() => setSuccess(false), 3000);
  
        } else {
          console.error("Server error:", response.statusText);
          alert("Failed to submit. Please try again.");
        }
  
      } catch (error) {
        console.error("Submit form error:", error);
        alert("Something went wrong. Please check your network connection.");
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
    const loginUser = async (email, password) => {
      try {
        const response = await fetch(`http://localhost:3001/userInfo?email=${email}`);
        const data = await response.json();

        if (data.length === 0) {
          throw new Error("Email not found");
          return
        }

        const user = data[0];

        if (user.password !== password) {
          throw new Error("Wrong password");
          return
        }
        console.log("Login success", user);
        await loginUserChangeStatus(user.id);
      } catch (err) {
        console.log("Login error:", err.message);
      }
    };
    const loginUserChangeStatus = async (id) =>{
      try{
        const response = await fetch(`http://localhost:3001/userInfo/${id}`,{
          method:'PATCH',
          headers:{'Content-Type':"application/json"},
          body:JSON.stringify({ status:true })
        })
        if(!response.ok){
          throw new Error("Signin Reject");
        }
        const res = await response.json();
        console.log("res",res);
        let details = {
          id : res.id,
          username:res.username,
          email:res.email,
          status:res.status
        }
        localStorage.setItem('userInDetails',JSON.stringify(details));
        loginStore(login(details));
        router.push('/loancalCalculator');
      }catch(error){
        console.error("Login Error",error)
      }
    }
    const signInFormData = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      await loginUser(signIn.email,signIn.password);
    }
    useEffect(()=>{
      getUserDetails();
    },[])
    useEffect(() => {
      setErrors({});
      if (switchForm) {
        setSignIn({ email: "", password: "" });
      } else {
        setForm({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          status: false
        });
      }
    }, [switchForm]);
  return (
     <div>
      <main className="pt-5">
        <LoginForm 
          switchForm={switchForm} 
          setSwitchForm={setSwitchForm}
          signInFormData={signInFormData} 
          signUpFormData={signUpFormData} 
          success={success} signIn={signIn} 
          handleChangesignIn={handleChangesignIn} 
          form={form} 
          handleChange={handleChange} 
          errors={errors}
        />
      </main>
    </div>
  );
}
