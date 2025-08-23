"use client"
import React, { useState,useEffect,useRef } from 'react'
import Silk from '@/animation/Silkbackground'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { set } from 'mongoose'
import AnimatedList from '@/animation/Animatedlist'

const page = () => {
  const [getDataToggeler, setGetDataToggeler] = useState(false)
 const [userData, setUserData] = useState([])
 const profileImage = useRef(null)
const [links, setLinks] = useState([])
const [profilepic, setProfilepic] = useState("")

  const path = usePathname();
  const firstSegment = path.split('/')[1];
  useEffect(() => {
    if(firstSegment){
    getUserData()
    console.log('userData', userData)
    }
  
  }, [firstSegment])
  

  // const router = useRouter();
  
  console.log('First segment:', firstSegment); // This will log the first segment of the
 const { data: session } = useSession()

 const getUserData= async()=>{
   const response= await fetch(`/api/user?ogusername=${firstSegment}`, {
     method: "GET",
     headers: { 'Content-Type': 'application/json' },

   });
   const data= await response.json();
   
   console.log('data', data)
   setGetDataToggeler(true);
   setUserData(data.data)
   profileImage.current=data.data.profilepic;
   setLinks(data.userlink.links);
   console.log('userlinks', links);
   setProfilepic(data.data.profilepic);
   
 }
 const test=()=>{
   console.log('test function called',links);
  }

  return (
    <>
    <section>
    <Silk
  speed={5}
  scale={1.5}
  color="#000080"
  noiseIntensity={1.5}
  rotation={2.59}
  className="silkCanvas min-h-screen"
  />

 <div>
      <h1 className='text-3xl text-center text-white'>Welcome to the Silk Animation Page</h1>
</div>
<div>
<div className='profilepic flex justify-center items-center mt-10'>
  <Image src={profilepic||profileImage.current} alt="user" width={50} height={50} className="rounded-full" />
</div>
<div className='text-center text-2xl font-bold text-white mt-5'>{userData.name}</div>
</div>
<div>
  <AnimatedList
  items={links}
  onItemSelect={(item, index) => console.log(item, index)}
  showGradients={true}
  enableArrowNavigation={true}
  displayScrollbar={true}
  className='w-full'
/>
  <button className='bg-white cursor-pointer' onClick={test}>hhhhhh</button>
</div>
    </section>
    </>
  )
}

export default page