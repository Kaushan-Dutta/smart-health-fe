import React, { useState,useEffect } from 'react'
import { ImCross } from 'react-icons/im';
import axios from 'axios';
import { useData } from './_app';

const Appointment=({doctor,date,id})=>(
    <div className='rounded-md font-inter w-3/5 mx-auto flx-row justify-between p-5 border border-shade1'>
        <div className=''>
            <img src="" alt="profile"/>
            <p>{doctor}</p>
        </div>
        <p>{id%2==0?'Cardiologist':'Neurologist'}</p>
        <p>{date}</p>
    </div>
)

const appointment = () => {
  const [popup,setPopup]=useState(false);
  const [doctors,setDoctors]=useState([]);
  const [appointment,setAppointment]=useState([]);
  const {user}=useData()

  useEffect(()=>{
    const loadContents=async()=>{
       try{
            const res=await axios.get('https://smart-heath-be.vercel.app/doctors');
            const result=await axios.get('https://smart-heath-be.vercel.app/get-appoint');
            console.log(result);
            setAppointment(result.data.message);
            setDoctors(res.data.message);
        }
       catch(err){
            console.log(err.message)
        }
       }
        loadContents();
    },[])
  
  
  const handleSubmit=async(e)=>{
     e.preventDefault();
     try{
            const doctor=document.getElementById('doctor').value;
            const date=document.getElementById('date').value;
            console.log(doctor,date);
            const book=await axios.post('https://smart-heath-be.vercel.app/book-appoint',{patientId:user._id,doctorCheck:doctor,date:date});
            
     } 
     catch(err){
        console.log(err)
     }
  }
  const BookAppointment=()=>{

    return(
        <div className='popup-window primary-container font-inter'>
            <div className='md:w-1/3 w-full rounded-md p-5 bg-light font-inter flx-col gap-5 border-2 border-theme'>
                <div className='w-full text-right'>
                    <button onClick={()=>{setPopup(false)}}><ImCross/></button>
                </div>
                <form className='flex flex-col gap-2 w-full text-left' onSubmit={handleSubmit}>
                    <label><b>Select Doctor:</b></label>
                    <select className='px-5 py-2 rounded-md' id="doctor">
                        {doctors.map((obj,id)=>(
                            <option key={id} value={obj.name}>{obj.name}</option>
                        ))}
                    </select>
                    <label><b>Select appointment date:</b></label>
                    <input type="date" className='px-5 py-2 rounded-md' id="date"/>
                    <button type='submit' className='primary-btn w-[100px] mx-auto'>Book</button>
                </form>
           </div>
        </div>
        )
  }
  return (
    <div className='base-container'>
        <p className=' text-4xl font-alata'><b>Appointments <span className='text-shade2'>available for you,</span> </b></p>

        <div className='flx-col justify-center gap-10 my-10 '>
            {appointment.map((obj,id)=><Appointment doctor={obj.doctorCheck} date={obj.date.split('T')[0]} id={id}/>)}
        </div>
        {user?.entity=="patient" && 
        <div className='flx-col justify-center gap-10 my-10 '>
            <button className='primary-btn mx-auto w-[200px]' onClick={()=>setPopup(true)}>Book Appointment</button>
        </div>}
        {popup && <BookAppointment/>}
    </div>
  )
}

export default appointment