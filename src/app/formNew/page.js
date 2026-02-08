'use client';
import react,{useState} from 'react'
import UserForm from '../components/userForm';
const Form = () => {
    const [name,setName] = useState('');
    return (
        <> 
        {name}
        <UserForm setName={setName} />
        </>
    )
}

export default Form