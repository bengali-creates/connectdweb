

"use client"
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

const Navadmin = ({ profiles }) => {
  const [toggle, setToggle] = useState(false);
  const { data: session } = useSession()

  return (
    <>
      {/* Desktop / Tablet Sidebar */}
      <nav className="hidden md:flex fixed top-0 left-0 h-screen w-[10%] bg-cyan-600 text-white flex-col items-center py-6 shadow-lg z-50">
        
        {/* Logo */}
        <div className=" font-bold mb-8">
          <Link href={"/"}>ConnectedWeb</Link>
        </div>

        {/* Profile section */}
        {session && (
          <div className="flex flex-col items-center mb-8 relative">
            <button 
              onClick={() => setToggle(!toggle)}
              className="rounded-full hover:shadow-2xl hover:shadow-green-500 cursor-pointer relative"
            >
              <Image src={session.user.image} alt="user" width={60} height={60} className="rounded-full" />
            </button>

            {/* Dropdown */}
            <div className={`absolute left-20 top-10 ${toggle ? "" : "hidden"} bg-white text-gray-900 divide-y divide-gray-200 rounded-lg shadow-lg w-44`}>
              <div className="px-4 py-3 text-sm">
                <div className="font-medium truncate">{session.user.name}</div>
              </div>
              <ul className="py-2 text-sm">
                <li><Link href="/" className="block px-4 py-2 hover:bg-gray-100">Home</Link></li>
                <li><Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link></li>
                <li><Link href={`/${profiles}/connectedlinks`} className="block px-4 py-2 hover:bg-gray-100">Your Page</Link></li>
                <li><Link href="/about" className="block px-4 py-2 hover:bg-gray-100">About Us</Link></li>
              </ul>
              <div className="py-2">
                <button 
                  className="cursor-pointer block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Vertical nav links */}
        <ul className="flex flex-col space-y-6  w-full pl-2">
          <li><Link href="/">🏠 Home</Link></li>
          <li><Link href={`/${profiles}/connectedlinks`}>🔗 Preview</Link></li>
          
          <li><Link href="/dashboard">📊 Dashboard</Link></li>
          {!session && (
            <li><Link href="/login">🔑 Login</Link></li>
          )}
        </ul>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-cyan-600 text-white flex justify-around items-center py-2 shadow-inner z-50">
        
        {/* Preview */}
        <Link href={`/${profiles}/connectedlinks`} className="flex flex-col items-center text-sm">
          🔗
          <span className="text-xs">Preview</span>
        </Link>

        {/* Profile button */}
        {session ? (
          <div className="relative">
            <button 
              onClick={() => setToggle(!toggle)}
              className="rounded-full cursor-pointer"
            >
              <Image src={session.user.image} alt="user" width={40} height={40} className="rounded-full" />
            </button>

            {/* Dropdown above profile pic */}
            <div className={`absolute bottom-12 right-0 ${toggle ? "" : "hidden"} bg-white text-gray-900 divide-y divide-gray-200 rounded-lg shadow-lg w-40`}>
              <div className="px-4 py-2 text-sm truncate">{session.user.name}</div>
              <ul className="py-2 text-sm">
                <li><Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link></li>
                <li><Link href="/" className="block px-4 py-2 hover:bg-gray-100">Home</Link></li>
              </ul>
              <div className="py-2">
                <button 
                  className="block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link href="/login" className="flex flex-col items-center text-sm">🔑<span className="text-xs">Login</span></Link>
        )}
      </nav>
    </>
  )
}

export default Navadmin

