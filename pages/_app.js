import Navbar from '../components/navbar'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import Button from '../components/button'
import { useState } from 'react'


function MyApp({ Component, pageProps }) {
  return <>
            {/* <div className="bg-white">
                <main className="shadow">
                    <div className="max-w-screen-lg mx-auto flex flex-row justify-between items-center p-4 sm:p-7 relative z-10 space-x-2 sm:space-x-3">
                        <Link href="/">
                            <a className="block">
                                <h1 className="text-2xl font-black"><span className="text-purple-700">
                                Calendly</span>
                                </h1>
                            </a>
                        </Link>

                        <div className="flex items-center text-sm font-semibold">
                         {access_token ?
                                <> 
                                    <a href="#" className="text-gray-700 hover:text-purple-700" >Log Out</a>
                                    <Link href={"/profile"}>
                                        <a className="text-gray-700 ml-7 border border-gray-300 hover:border-gray-400 rounded px-4 py-2">Profile</a>
                                    </Link>
                                </> 
                            :
                            <>
                                   <Link href={"/login"}>
                                       <a className="text-gray-700 hover:text-purple-700">Sign In</a>
                                     </Link>
                                     <Link href={"/register"}>
                                        <a className="text-gray-700 ml-7 border border-gray-300 hover:border-gray-400 rounded px-4 py-2">Create Account</a>
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </main>
            </div> */}
            {/* <Navbar/> */}

    <Component {...pageProps} />
  </>
}

export default MyApp
