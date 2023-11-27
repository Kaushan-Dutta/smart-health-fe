import React,{useState,useEffect} from 'react'
import {useData} from './_app.js'
import axios from 'axios'

const Comment=({comment,username,date})=>{
  return(
  <div className='flx-row justify-between w-full shadow-md h-[100px] font-inter rounded-md p-5'>
     <p className='w-2/3'>{comment}</p>
     <p className='w-1/3 mx-5'>{username}</p>
     <p className='w-1/3'>{date}</p>
  </div>)
}
const discussion = () => {
  const {user}=useData();
  const [comment,setComment]=useState('');
  const [doubts,setDoubts]=useState([]);

  const handleSubmit=async()=>{
    try{
    const res=await axios.post('https://smart-heath-be.vercel.app/postdoubt',{comment,postedBy:user?.email?.split('@')[0]});
    //console.log(res.data);
    window.location.reload();}
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    const loadContents=async()=>{
      try{
      const res=await axios.get('https://smart-heath-be.vercel.app/getdoubts');
      //console.log(res.data.message);
      setDoubts(res.data.message);
    }
      catch(err){
        console.log(err)
      }
    }
    loadContents();
  },[])

  return (
    <div className='text-black base-container '>
      <p className=' text-4xl font-alata'><b>Discussion <span className='text-shade2'>forum,</span> </b></p>
      
      <section className='  mx-auto '>
        <div className='h-[70px] my-10 border rounded-full p-3 w-1/2 mx-auto border-shade1 flx-row justify-between'>
          <input type="text" placeholder='Enter your comment ' value={comment} onChange={(e)=>{
            setComment(e.target.value)
          }} className='bg-light outline-none font-alata w-full p-3'/>
          <span className='ml-3 primary-btn w-[200px]'><button onClick={handleSubmit}>Add Comment</button></span>
        </div>
        <div className='flx-col gap-5 w-3/5 mx-auto'>
            {doubts?.map((obj,id)=>(
              <Comment ke={id} username={obj.postedBy} comment={obj.comment} date={obj.date}/>
            ))}
        </div>
      </section>
    </div>
  )
}

export default discussion