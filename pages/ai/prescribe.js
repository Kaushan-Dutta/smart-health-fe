import React,{useCallback} from 'react'
import { RiGalleryLine } from 'react-icons/ri';
import Ai from '@/api/Ai'
import {useDropzone} from 'react-dropzone';


const prescribe = () => {
  const {loading,askai,setAskai,prescibeReport,prescibe,
    }=Ai();

  const onDrop=useCallback(async(acceptedFiles)=>{
    console.log(acceptedFiles[0]);
    setAskai(acceptedFiles[0]);
  },[])

  const {getRootProps,getInputProps,isDragActive}=useDropzone({onDrop})
  
  return (
    <div className='text-black base-container '>
      <p className=' text-4xl font-alata'><b>Submit your <span className='text-shade2'>report,</span> </b></p>
      
      <section className='  mx-auto '>
        <div className='my-10 border-2 border-dotted rounded-md p-3 w-1/2  border-shade1 flx-col justify-center mx-auto' {...getRootProps()}>
            <input {...getInputProps()} />
            <RiGalleryLine className='text-5xl text-shade1'/>
            <p className='ml-3 text-lg font-inter'>{askai?.name || "Upload File"}</p>
        </div>
        <button onClick={prescibeReport} className="primary-btn w-[200px] mx-auto">Upload</button>

        <div className="text-md font-inter  my-5">
            <p className="">{prescibe} </p>
        </div>

      </section>
    </div>
  )
}

export default prescribe