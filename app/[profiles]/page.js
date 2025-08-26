"use client"
import React from 'react'
import Navadmin from '@/components/Navadmin'
import { useState,useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { get, set } from 'mongoose'
import GradientText from '@/animation/gradientText'
import Lotiecontroler from '@/components/Lotiecontroler'


const Profiles = () => {
  const { data: session, update } = useSession()
  const [links, setLinks] = useState([{link:'', linktext:''}]);
  const [displayLinks, setDisplayLinks] = useState([]);
  const [getChanger, setGetChanger ] = useState(true)
  const [currentUser, setCurrentUser] = useState( "");
  const [showEdit, setShowEdit] = useState("")
  const [showEdit2, setShowEdit2] = useState("")
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
   
// handle Edit
  const handleEdit = (id) => {
    setShowEdit(id);
  
  };
  const handleEdit2 = (id) => {
    setShowEdit2(id);
    console.log('showEdit2', showEdit2)
  
  };

  const handleditSubmit = async (id) => {
    const editedLink = displayLinks.find((l) => l._id === id);
    console.log('editedLink', editedLink)
    const response=await fetch(`/api/links/${id}`, {
      method:"PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user:currentUser , updatedLink: editedLink }),
    })
    const data = await response.json();
    console.log('Edited link:', data);
    // Reset the showEdit state to stop editing
    setShowEdit("");
    setShowEdit2("");
    setGetChanger(!getChanger);
  }
// Function to handle form submission
  const handleSubmit = async (e) => {
  
  const response = await fetch('/api/links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user:currentUser , links }),
  });
  setLinks([{link:'', linktext:''}]); 
  const data = await response.json();
  setGetChanger(!getChanger);

  
  console.log('Response:', data);
};

// Delete link
const handleDelete = async (id) => {
  const  response= await fetch(`/api/links/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: currentUser }),
  });
  const data = await response.json();
  setGetChanger(!getChanger);
}

// geting links
 const getLinks = async () => {
  const response= await fetch(`/api/links?user=${currentUser}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }});
    const data = await response.json();
    setDisplayLinks(data.data.links);
  
 }
  const handlechange2= (id,name,value) => {
    // const { name, value } = e.target;
    setDisplayLinks((prevLinks) =>
       prevLinks.map((link, ) =>
        id === link._id ? { ...link, [name]: value } : link
      )
      
    );
    console.log('editedLink changed:', displayLinks);
  
    
  }  
  return (
    <main>
      <Navadmin profiles={currentUser} />
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
        return <section className='bg-cyan-100 md:m-1.5 m-0.5 p-1.5 border-2 border-blue-700 border-dotted rounded-2xl' key={link._id}>
          <div id="link" className=' md:pl-7 md:gap-25 items-center'>
          {showEdit===link._id?(
            <div className='flex items-center gap-2'>
            <input type="text" onChange={(e)=>{handlechange2(link._id,e.target.name,e.target.value)} } value={link.linktext} name='linktext' id='linktext' placeholder='enter the url'/>
          <Lotiecontroler src="/addbtn.lottie" label="" className="cursor-pointer  pl-2 " cl="w-6 h-6" onClick={() => {handleditSubmit(link._id)}}/>
          </div>):( <div className='text-xl text-amber-950 font-bold'>{link.linktext}<Lotiecontroler src="/edit.lottie" label="" className="cursor-pointer  pl-2 " cl="w-6 h-6" onClick={() => {handleEdit(link._id)}}/></div>)}
          
          {showEdit2===link._id?(
            <div className='flex items-center gap-2'>
            <input type="text" onChange={(e)=>{handlechange2(link._id,e.target.name,e.target.value)} } value={link.link} name='link' id='link' placeholder='enter the url name'/>
          <Lotiecontroler src="/addbtn.lottie" label="" className="cursor-pointer  pl-2 " cl="w-6 h-6" onClick={() => {handleditSubmit(link._id)}}/>
          </div>):(
          <div>{link.link}<Lotiecontroler src="/edit.lottie" label="" className="cursor-pointer relative top-1 pl-2 " cl="w-6 h-6" onClick={() => {handleEdit2(link._id)}}/></div>
          )}
          <div className='buttons '>
              <Lotiecontroler src="/delete.lottie" label="" className="cursor-pointer relative top-1 pl-2 " cl="w-6 h-6" onClick={() => {handleDelete(link._id)}}/>
          </div>
          </div>
</section >
      })}
       
       <button onClick={handleSubmit} className='p-5 py-2 mx-2 bg-slate-900 text-white font-bold rounded-3xl cursor-pointer'><span >+ Add Link</span></button>
          
    </div>
    </main>
  )
}

export default Profiles