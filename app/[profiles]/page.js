"use client"
import React from 'react'
import Navadmin from '@/components/Navadmin'
import { useState,useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { get, set } from 'mongoose'
import GradientText from '@/animation/gradientText'
  


const Profiles = () => {
  const { data: session, update } = useSession()
  const [links, setLinks] = useState([{link:'', linktext:''}]);
  const [displayLinks, setDisplayLinks] = useState([{link:'', linktext:''}]);
  const [getChanger, setGetChanger ] = useState(true)
  const [currentUser, setCurrentUser] = useState( "");
  useEffect(() => {
    if (session) {
      setCurrentUser(session.user.name);
    } 
  }, [session]);

  useEffect(() => {
    getLinks()
    console.log('displayLinks:', displayLinks)
  }, [getChanger, currentUser]);
  
  console.log('currentUser:', currentUser);
  
  // 

  const handlechange = (e) => {
    const { name, value } = e.target;
    setLinks((prevLinks) =>
      prevLinks.map((link, i) =>{
        return{ ...link, [name]: value } }
      )
    );
    // setLinks({...links,[e.target.name]: e.target.value});
    console.log('Link changed:', links);
  }
    
  const handleSubmit = async (e) => {
  
  const response = await fetch('/api/links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user:currentUser , links }),
  });
  setLinks([{link:'', linktext:''}]); 
  const data = await response.json();
  setGetChanger(!getChanger);
  // setDisplayLinks(data.data.links);
  // console.log('displayLinks:', displayLinks);
  
  console.log('Response:', data);
};
 const getLinks = async () => {
  const response= await fetch(`/api/links?user=${currentUser}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }});
    const data = await response.json();
    setDisplayLinks(data.data.links);
    ;
  
 }
  const handlechange2= (index,name,value) => {
    // const { name, value } = e.target;
    setLinks((prevLinks) =>
       prevLinks.map((link, i) =>
        index === i ? { ...link, [name]: value } : link
      )
      
    );
    console.log('Link changed:', links);
  
    
  }  
   const addLink= () => { 
    setLinks(links.concat([{link: "", linktext: ""}]))
    }
  return (
    <main>
      <Navadmin />
    <div className='bg-cyan-50 pt-7 mt-8 text-black'>
      <button className='text-xl'><GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
 ADD LINK +
</GradientText></button>
      <h1>ENTER THE URL</h1>
      <input type="text" onChange={handlechange} value={links[0].link} name='link' id='link' placeholder='enter the url'/>
      <h1>ENTER THE NAME</h1>
      <input type="text" onChange={handlechange}  value={links[0].linktext}  name='linktext' id='linktext' placeholder='enter the url name'/>
      {displayLinks && displayLinks.map((link,index) =>{
        return <section className='bg-cyan-100 md:m-1.5 m-0.5 p-1.5 border-2 border-blue-700 border-dotted rounded-2xl11' key={index}>
          <div id="link" className='flex md:pl-7 md:gap-25 items-center'> 
          <div>{link.link}</div>
          <div>{link.linktext}</div>
          </div>
</section >
      })}
       
       <button onClick={handleSubmit} className='p-5 py-2 mx-2 bg-slate-900 text-white font-bold rounded-3xl cursor-pointer'><span >+ Add Link</span></button>
          
    </div>
    </main>
  )
}

export default Profiles