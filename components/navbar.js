import { useState } from 'react'
import { useEffect } from "react";
import axios from  '../plugins/axios';
import { useRouter } from 'next/router'

function NavLink({to, children}) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>
}

function MobileNav({open, setOpen}) {
    const [access_token , setUser]= useState(
        typeof window !== "undefined" ? localStorage.getItem('access_token') : null
      );
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
                <a className="text-xl font-semibold" href="/">
                    <h1 className="text-2xl font-black"><span className="text-purple-700">
                        Calendly</span>      
                    </h1></a>
            </div>
            <div className="flex flex-col ml-4">
                
                { access_token ?
                <>
                    <a className="text-xl font-normal my-4" href="#" onClick={logout}>
                       Logout
                    </a>
                </>
                :
                <>
                    <a className="text-xl font-normal my-4" href="/login" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Login
                    </a> 
                    <a className="text-xl font-normal my-4" href="/register" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                        Register
                    </a>
                    
                </>
                
                }
            </div>  
        </div>
    )
}
const logout = async () => {
    // const router =  useRouter()

    await axios.get('/api/logout',
    {
        headers: { 'Content-Type': 'application/json' ,
                   'Accept':'application/json' ,
                   'Authorization': `Bearer ${localStorage.getItem('access_token')}`   
        },
        withCredentials: true
    })

    localStorage.clear();
    location.reload()
} 
// const  access_token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;


export default function Navbar() {
    
    const [open, setOpen] = useState(false)
    const [access_token , setUser]= useState(
        typeof window !== "undefined" ? localStorage.getItem('access_token') : null
      );     
    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center coller">
            <MobileNav open={open} setOpen={setOpen}/>
            <div className="w-3/12 flex items-center">
                <a className="block" href="/">
                    <h1 className="text-2xl font-black"><span className="text-purple-700">
                                Calendly</span>
                                
                    </h1>
                </a>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex">
                { access_token?
                    <>
                        <a className="mx-4" href="/schedule">
                           Schedules
                        </a>
                        <a className="mx-4" href="/event">
                           Events
                        </a>
                        <a className="mx-4" href="#" onClick={logout}>
                          Logout
                        </a>
                       
                    </>
                    :
                    <>
                        <a className="mx-4" href="/login" >
                          Login
                        </a>
                        <a className="mx-4" href="/register" >
                          Register
                        </a>
                       
                    </> 
                }
                    

                </div>
            </div>
        </nav>
    )
}