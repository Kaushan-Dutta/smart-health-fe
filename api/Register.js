import React,{useState,useCallback,useEffect} from 'react'
import axios from 'axios';

const Register = () => {
  const [loading,setLoading]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [name,setName]=useState();
  
  const registerList=[
    {
        text:'email',
        placeholder:'Enter your email',
        label:'Email',
        onChange:(e)=>{
            setEmail(e.target.value)
        }
    },
    {
        text:'password',
        placeholder:'Enter your password',
        label:'Password',
        onChange:(e)=>{
            setPassword(e.target.value)
        }
    },
    {
        text:'text',
        placeholder:'Enter your username',
        label:'Username',
        onChange:(e)=>{
            setName(e.target.value)
        }
    },
  ]
  const useregister=useCallback(async()=>{
    try{
      const response=await axios.post('https://smart-heath-be.vercel.app/auth/signup',{
        email:email,
        password:password
      })
      console.log(response.data.message);
      window.location.href="/login";
    }

    catch(err){
      console.log(err.message);
    }
  },[email,password])
  return (
    {registerList,loading,useregister}
  )
}

export default Register