import React from "react";
import Ai from "@/api/Ai";

const askai = () => {
  const { loading, askai, setAskai,setAianswerArray, aianswerArray,solveDoubt } = Ai();
  
  return (
    <div className="text-black base-container">
      <p className=' text-4xl font-alata'><b>Ask your&nbsp;<span className='text-shade2'>doubts,</span> </b></p>
      <section className="flx-col justify-center my-5">
        <div className="w-2/3 mx-auto">
          {
            aianswerArray?.map((obj,id)=>(
              <div className={`text-white font-inter flx-row my-2 ${obj.entity=='user'?` justify-end`:` justify-start`}`} key={id}>
                  <p className={`p-2 rounded-md ${obj.entity=='user'?`bg-shade1 `:`bg-shade2 `}`}>{obj.comment}</p>
              </div>
            ))
          }
        </div>
        <form onSubmit={solveDoubt} className='h-[70px] my-10 border rounded-full p-3 w-1/2  border-shade1 flx-row justify-center bottom-2 absolute' >
            <input type="text" placeholder='Enter your doubt ' className='bg-light outline-none font-alata w-full p-3' onChange={(e)=>{setAskai(e.target.value)}}/>
            <span className='ml-3 primary-btn w-[200px]'><button type="submit">Ask doubt</button></span>
        </form>
      </section>
    </div>);
};

export default askai;
