"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import React from 'react'
// import './Navbar.css'
import { useState } from 'react'
import Image from 'next/image'

const Navadmin = ({profiles}) => {
    const [toggle, setToggle] = useState(false);
    const { data: session, update } = useSession()

    return (


        <nav className='fixed w-full flex justify-between items-center p-3 text-white backdrop-blur-xs shadow-indigo-300 shadow-lg/55 z-100 bg-cyan-600 top-0'>
      <div className='text-2xl font-bold logo'>
        <Link href={"/"}> ConnectedWeb</Link>
      </div>
      <ul className='flex space-x-4 text-xl'>
        <li className='md:block hidden'><Link href="/">Home</Link></li>
        <li className='md:block hidden'><Link href={`/${profiles}/connectedlinks`}>Preview</Link></li>
        <li className='md:block hidden'><Link href="/contact">Contact</Link></li>
        <li className='md:block hidden'><Link href="/dashboard">Dashboard</Link></li>

        {session ? (
          <>

            <button id="dropdownInformationButton" onClick={() => { setToggle(!toggle) }} onBlur={() => {
              setTimeout(() => {
                setToggle(false)

              }, 200);
            }} className="rounded-full relative cursor-pointer hover:shadow-2xl hover:shadow-green-500" type="button"> 
                <Image src={session.user.image} alt="user" width={30} height={35} className="rounded-full" />
            </button>

            {/* <!-- Dropdown menu --> */}
            <div id="dropdownInformation" className={` z-10  ${toggle ? "" : "hidden"} bg-white divide-y absolute divide-gray-100 rounded-lg shadow-sm w-44 right-1 top-15 dark:bg-gray-700 dark:divide-gray-600`}>
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Ho Ho Ho</div>
                <div className="font-medium truncate">{session.user.name}</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >
                <li>
                  <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
                </li>
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li onClick={() => {
                  console.log('clicked');
                }}>
                  <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
                <li>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">About us</Link>
                </li>
              </ul>
              <div className="py-2">
                <button className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white' onClick={() => signOut()}>Sign out</button>
              </div>
            </div>

          </>
        ) : (
          <li><Link href={"/login"}>Login</Link></li>
        )

        }
      </ul>
    </nav>
    )
}

export default Navadmin