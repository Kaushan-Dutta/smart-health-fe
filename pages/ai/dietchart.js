import React from 'react'
import Ai from '@/api/Ai'

const dietchart = () => {
  const {prepareDietChart,loading,askai,setAskai,dietchart}=Ai()

  return (
    <div className='text-black base-container '>
      <p className=' text-4xl font-alata'><b>Prepare your <span className='text-shade2'>diet chart,</span> </b></p>
      
      <section className='  mx-auto '>
        <form onSubmit={prepareDietChart} className='my-10 border rounded-full p-3 w-1/2  border-shade1 flx-row justify-center mx-auto'>
            <input type="text" placeholder='Enter your comment ' className='bg-light outline-none font-alata w-full p-3' onChange={(e)=>{setAskai(e.target.value)}}/>
            <span className='ml-3 primary-btn w-[200px]'><button type='submit'>Add Comment</button></span>
        </form>
      </section>
    </div>
  )
}

export default dietchart