import Login from "./login";
import { useRouter } from 'next/router'
import {useState} from 'react'
import Schedule from './schedule'



export default function Home() {
  const router = useRouter()
  const [access_token , setUser]= useState(
    typeof window !== "undefined" ? localStorage.getItem('access_token') : null
  );   
  // const  access_token  = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;

  // if(access_token){
  //   router.push('schedule')
  // }else{
  //   router.push('login')

  // }
   
    
  

  return (

    <>
    {access_token?
     <Schedule/>
    :
    <Login/>

    }
    </>
  
  )
}