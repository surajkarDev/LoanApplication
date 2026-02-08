'use client';
import React,{useState} from "react";

 const UserForm = (props) =>{
    const [userName,setUserName] = useState("");
    const submitName = (e) => {
      e.preventDefault();
        props.setName(userName);
    }
    return (
        <>
            <form>
                <input className="border" type="text" onChange={(e)=> setUserName(e.target.value)} name="name" value={userName}/>
                <button type="text" onClick={(e)=>submitName(e)}>Click</button>
            </form>
        </>
    )
}

export default UserForm