import React, { useState,useEffect } from 'react'
import Navlinks from '../routes.config';
import Link from 'next/link';
import { GoPerson } from 'react-icons/go';
import axios from 'axios';
import {useData} from '../pages/_app.js';

const Navbar = () => {
    const {user}=useData();
    const handleDownload = async () => {
        try {
          const response = await axios.get('https://cloud.appwrite.io/v1/storage/buckets/6530bfdbcbfe945b9078/files/e50be799-a2e9-412e-b123-7039a55837eb/view?project=6530bf8db1e5ad742ba0&mode=admin', {
            responseType: 'arraybuffer', // Specify the response type as 'arraybuffer'
          });
      
          const blob = new Blob([response.data], { type: 'video/mp4' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'your-video.mp4'; // Set the desired file name with the .mp4 extension
          a.click();
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('File download error:', error);
        }
      };
    
    return (
        <nav className='z-10 fixed px-[5vw] shadow-md bg-theme text-white flx-row justify-between w-full py-3'>
            <div className='text-3xl font-comf'>
                <Link href="/" >smarthealth</Link>
            </div>
            <div className='font-inter text-lg list-none flx-row justify-between'>
                {Navlinks.filter((fil1) => (
                    fil1.showNav
                )).filter((fil2) => (
                    fil2.protected ? (user
                        ? (fil2.entity ?
                             ((fil2.entity.includes(user?.entity)) ? true : false)
                         : true) 
                        : false) : true
                )).map((obj, id) => (
                    <li key={id} className='mr-5'><Link href={obj.path}>{obj.name}</Link></li>
                ))}
                {user?
                    <li className='cursor-pointer' onClick={()=>{
                        localStorage.removeItem('smarthealth');
                        window.location.href='/';
                    }}>Logout</li>:
                    <li ><Link href="/login">Login</Link></li>
                }
                {user?.entity=='patient' && <div className='dropdown ml-5'>
                    <li className='font-bold text-3xl'><GoPerson/></li>
                    <div className='-translate-x-20 dropresult absolute rounded-md bg-shade1 p-5 w-48'>
                        {Navlinks.filter((fil1) => (
                            fil1.showDrop
                        )).filter((fil2) => (
                            fil2.protected ? (user
                                ? (fil2.entity ?
                                    ((fil2.entity.includes(user?.entity)) ? true : false)
                                : true) 
                                : false) : true
                        )).map((obj, id) => (
                            <li key={id} className='my-3'><Link href={obj.path}>{obj.name}</Link></li>
                        ))}
                    </div>
                </div>}
                
            </div>
        </nav>
    )
}

export default Navbar