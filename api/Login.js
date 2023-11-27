import React,{useState,useCallback,useEffect} from 'react'
import axios from 'axios';

const Login = () => {
  const [loading,setLoading]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  
  const loginList=[
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
    }
  ]
  const userlogin=useCallback(async()=>{
    try{
      const response=await axios.post('https://smart-heath-be.vercel.app/auth/login',{
        email:email,
        password:password
      })
      console.log(response.data.message);
      localStorage.setItem('smarthealth',JSON.stringify({token:response.data.token}));
      window.location.href="/";
    }

    catch(err){
      console.log(err.message);
    }
  },[email,password])
  return (
    {loginList,loading,userlogin}
  )
}

export default Login