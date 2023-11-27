import React, { useState } from 'react'
import Register from '@/api/Register'
import Link from 'next/link';

const register = () => {
  const {loading,registerList,useregister}=Register();

  return (
    <div className='container-center'>
      <div className='border rounded-md p-5 w-96 flex flex-col gap-5'>
        {registerList.map((obj,id)=>(
          <div key={id} className='font-alata'>
            <p htmlFor={obj.text}>{obj.label}</p>
            <input {...obj} className='w-full outline-none p-2 '/>
          </div>
        ))}
        <button onClick={useregister} className='primary-btn w-1/3 mx-auto'>Register</button>
        <p>Not Registered?&nbsp;<Link href="/login" className='text-shade1 font-bold'>Click Here</Link></p>
      </div>
    </div>
  )
}

export default register