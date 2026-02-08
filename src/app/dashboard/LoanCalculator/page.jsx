'use client';
import React, { useState,useRef,useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3001/loanDetails");
  return response.data;
}

const Counter = () => {
  const MIN = 0;
  const MAX = 10;
  const STEP = 2;

  const [count, setCount] = useState(0);
  const [formData,setFormData] = useState({ email: '', password: '' });
  const email = useRef('');
  const password = useRef('');
  const [searchBox,setSearchBox] = useState("");
  const [filterBox,setfilterBox] = useState([]);
  const users = [
  {
    id: 1,
    name: "Charlotte Amelia",
    role: "UI/UX Designer",
    experience: 4.5,
    location: "Mohali",
    status: "Active"
  },
  {
    id: 2,
    name: "Rahul Sharma",
    role: "Frontend Developer",
    experience: 3,
    location: "Bangalore",
    status: "Inactive"
  },
  {
    id: 3,
    name: "Ananya Verma",
    role: "React Developer",
    experience: 5,
    location: "Delhi",
    status: "Active"
  },
  {
    id: 4,
    name: "Amit Patel",
    role: "Full Stack Developer",
    experience: 6,
    location: "Ahmedabad",
    status: "Active"
  },
  {
    id: 5,
    name: "Sneha Iyer",
    role: "Vue.js Developer",
    experience: 4,
    location: "Chennai",
    status: "Inactive"
  },
  {
    id: 6,
    name: "Rohit Singh",
    role: "Frontend Engineer",
    experience: 2.5,
    location: "Pune",
    status: "Active"
  }
];

const {data,isloading,error} = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
})


  const handleDecrement = () => {
    setCount(prev => Math.max(prev - STEP, MIN));
  };

  const handleIncrement = () => {
    setCount(prev => Math.min(prev + STEP, MAX));
  };

  const handUnControlledSubmit = (e) => {
   e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    console.log("Email:", emailValue);
    console.log("Password:", passwordValue);
    e.target.reset();
  };

  const handControlledSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    // e.target.reset();
  }

  const handelChange = (e) => {
    const {type,value} = e.target;
    setFormData({
        ...formData,
        [type]: value
    })
  }

  const handelChangeSearch = (e) =>{
    setSearchBox(e.target.value)
  }
  const timeOutRef = useRef(null);
  useEffect(() => {
    clearTimeout(timeOutRef.current);

    timeOutRef.current = setTimeout(() => {
      setfilterBox(
        users.filter(item =>
          item.name.toLowerCase().includes(searchBox.toLowerCase())
        )
      );
    }, 1000);

    return () => clearTimeout(timeOutRef.current);
  }, [searchBox]);
  // const filterArray = () =>{
  //   clearTimeout(timeOutRef.current);
  //   timeOutRef.current = setTimeout(()=>{
  //     setfilterBox(users.filter(item=> item.name.toLowerCase().includes(searchBox.toLowerCase())))
  //   },1000);
  // }
  let content;

  if (isloading) {
    content = <h6>Loading...</h6>;
  } else if (error) {
    content = <h6>Error loading users</h6>;
  } else {
    content = <h6>Users: {JSON.stringify(data)}</h6>;
  }
      

  return (
    <>
    
    {content}
      <h3>Count: {count}</h3>
      <button onClick={handleDecrement} disabled={count <= MIN}>
        Decrement
      </button> &nbsp;&nbsp;
      <button onClick={handleIncrement} disabled={count >= MAX}>
        Increment
      </button>

      <form onSubmit={handUnControlledSubmit}>
        <input className="border p-2 m-2" placeholder="Email" type="email" ref={email} />
        <input className="border p-2" placeholder="Password" type="password" ref={password} />
        <button className="m-2 border p-2 px-4" type="submit">Submit Uncontrolled Form</button>
      </form>

      <form onSubmit={handControlledSubmit}>
        <input className="border p-2 m-2" placeholder="Email" name="email" type="email" value={formData.email} onChange={handelChange}/>
        <input className="border p-2" placeholder="Password" name="password" type="password" value={formData.password} onChange={handelChange} />
        <button className="m-2 border p-2 px-4" type="submit">Submit Controlled Form</button>
      </form>

      <input type="text" name="Search" placeholder="Search" value={searchBox} onChange={(e)=> handelChangeSearch(e)} />
      <p>Search value: {searchBox}</p>
      <p>filter data : {JSON.stringify(filterBox)}</p>
    </>
  );
};

export default Counter;
