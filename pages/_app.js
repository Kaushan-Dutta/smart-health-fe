import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {useEffect,useState,useContext,createContext} from "react";
import axios from "axios";

const Data=createContext();

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState();
    useEffect(() => {
        const loadContents=async()=>{
            const token=JSON.parse(localStorage.getItem('smarthealth'));
            console.log(token);
            try{
            if(token)
            {const res=await axios.get('http://localhost:3030/auth/user',{headers:{
                authorization: `Bearer ${token.token}`
            }});
        
            setUser(res.data.message.userId);}}
            catch(err){
                console.log(err.message)
            }
            //setUser(res.data);
        }
        loadContents();
  },[])
  const value={user}
  return (
    <Data.Provider value={value}>
      <Navbar />
      <div className="bg-light min-h-screen ">
          <Component {...pageProps} />
      </div>
      <Footer/>
    </Data.Provider>
  );
}
export const useData=()=>useContext(Data);
