import React,{useEffect} from 'react';
import {useData} from './_app.js';
import Doctor from '../asset/doctor.png';
import Patient from '../asset/patient.png';
import Admin from '../asset/admin.png';
import Image from 'next/image.js';

const profile = () => {
  const {user}=useData();
  useEffect(()=>{
    console.log(user?.entity)
  },[user])
  return (
    <div className='container-center'>
        <div className='w-96 p-5 border-2 flx-col gap-5'>
            <Image src={(user?.entity=="patient")?Patient:(user?.entity=="doctor")?Doctor:(user?.entity=="admin")?Admin:''} alt="Profile Image" className='w-40 h-40 rounded-full border-2 border-shade2 bg-contain '/>
            <p className='text-lg font-inter'>{user?.email?.split('@')[0]}</p>
            <p className='text-lg font-inter'>{user?.email}</p>
            <button className='primary-btn w-full'>Update</button>
        </div>
    </div>
  )
}

export default profile