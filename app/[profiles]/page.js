"use client"
import React from 'react'
import Navadmin from '@/components/Navadmin'
import { useState } from 'react'


const Profiles = () => {
  const [links, setLinks] = useState([{link:'', linktext:''}]);
  
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
    body: JSON.stringify({ links }),
  });
  const data = await response.json();
  console.log('Response:', data);
};
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
    <div className='bg-cyan-100 pt-7 mt-8 text-black'>
      <h1 className='text-xl'>ADD LINK</h1>
      <h1>ENTER THE URL</h1>
      <input type="text" onChange={handlechange} value={links.link} name='link' id='link' placeholder='enter the url'/>
      <h1>ENTER THE NAME</h1>
      <input type="text" onChange={handlechange} value={links.linktext} name='linktext' id='linktext' placeholder='enter the url name'/>
      {links && links.map((link,index) =>{
        return <div key={index}>
          <div>{link.link}</div>
          <div>{link.linktext}</div>
</div>
      })}
       <button onClick={handleSubmit} className='p-5 py-2 mx-2 bg-slate-900 text-white font-bold rounded-3xl'>+ Add Link</button>
          
    </div>
    </main>
  )
}

export default Profiles