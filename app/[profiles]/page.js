"use client"
import React from 'react'
import Navadmin from '@/components/Navadmin'
import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { get, set } from 'mongoose'
import GradientText from '@/animation/gradientText'
import Lotiecontroler from '@/components/Lotiecontroler'
import FadeContent from '@/animation/Fade'

const Profiles = () => {
  const { data: session, update } = useSession()
  const [links, setLinks] = useState([{ link: '', linktext: '' ,allowed:true}]);
  const [displayLinks, setDisplayLinks] = useState([]);
  const [getChanger, setGetChanger] = useState(true)
  const [currentUser, setCurrentUser] = useState("");
  const [showEdit, setShowEdit] = useState("")
  const [showEdit2, setShowEdit2] = useState("")
  const [showAdd, setShowAdd] = useState(false)
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
      prevLinks.map((link, i) => {
        return { ...link, [name]: value }
      }
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

// handle editted submit
  const handleditSubmit = async (id) => {
    const editedLink = displayLinks.find((l) => l._id === id);
    console.log('editedLink', editedLink)
    const response = await fetch(`/api/links/${id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: currentUser, updatedLink: editedLink }),
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
      body: JSON.stringify({ user: currentUser, links }),
    });
    setLinks([{ link: '', linktext: '' }]);
    const data = await response.json();
    setGetChanger(!getChanger);
    setShowAdd(false);

    console.log('Response:', data);
  };

  // Delete link
  const handleDelete = async (id) => {
    const response = await fetch(`/api/links/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: currentUser }),
    });
    const data = await response.json();
    setGetChanger(!getChanger);
  }

  // geting links
  const getLinks = async () => {
    const response = await fetch(`/api/links?user=${currentUser}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    setDisplayLinks(data.data.links);

  }
  const handlechange2 = (id, name, value) => {
    // const { name, value } = e.target;
    setDisplayLinks((prevLinks) =>
      prevLinks.map((link,) =>
        id === link._id ? { ...link, [name]: value } : link
      )

    );
    console.log('editedLink changed:', displayLinks);

      const handleToggleAllowed = async (id) => {
        const toggledLink = displayLinks.find((l) => l._id === id);
        if (!toggledLink) return; // If link not found, exit the function
        const updatedAllowed = !toggledLink.allowed; // Toggle the allowed value
        const response = await fetch(`/api/links/${id}`, {
          method: "PATCH",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: currentUser, updatedLink: { ...toggledLink, allowed: updatedAllowed } }),
        });
        const data = await response.json();
        console.log('Toggled link:', data);
        setGetChanger(!getChanger); 
      }

  }
  return (
    <main className='bg-gradient-to-b from-gray-100 to-blue-100  '>
      <Navadmin profiles={currentUser} />
      <div className='bg-gradient-to-b from-gray-100 to-blue-100 pt-7 mt-8 text-black md:w-[60%] w-[80%] min-h-screen rounded-3xl fixed top-10 md:left-[11%] left-[10%] px-3 pb-10 '>
        <div className='flex justify-center '>
          <button className='text-xl font-bold max-w-fit p-2 ' onClick={() => { setShowAdd(!showAdd) }} 
          // onBlur={() => {
          //     setTimeout(() => {
          //       setShowAdd(false)

          //     }, 200);}}
              >
                <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="px-5 py-2 font-bold"
        >
          ADD LINK +
        </GradientText>
        </button>
        </div>
        
          <div className={`${showAdd ? "" : "hidden"} fixed right-[47%] top-40 flex justify-center items-center z-1  `} id='addlinks_modal'>
            <div className=' bg-green-600 px-3 py-5 rounded-3xl flex flex-col justify-center border-4 border-dotted border-blue-900'>
              <h1>ENTER THE URL</h1>
              <input type="text" onChange={handlechange} value={links[0].link} name='link' id='link' placeholder='enter the url' className='w-2xs' />
              <h1>ENTER THE NAME</h1>
              <input type="text" onChange={handlechange} value={links[0].linktext} name='linktext' id='linktext' placeholder='enter the url name'  className='w-2xs'/>
              <button onClick={handleSubmit} className='p-5 py-2 mx-2 my-3 bg-slate-900 text-white font-bold rounded-3xl cursor-pointer'><span >+ Add Link</span></button>
            </div>
          </div>
        
        {displayLinks && displayLinks.map((link, index) => {
          return <section className='bg-cyan-100 md:m-1.5 w-[90%] mt-2 md:mt-4 m-0.5 p-1.5 border-2 border-blue-700 border-dotted rounded-2xl shadow-md drop-shadow-xl hover:shadow-[#01065a] ' key={link._id}>
            <div id="link" className=' md:pl-7 md:gap-25 items-center flex flex-col md:flex-row justify-between  '>
              <div>{showEdit === link._id ? (
                <div className='flex items-center gap-2'>
                  <input type="text" onChange={(e) => { handlechange2(link._id, e.target.name, e.target.value) }} value={link.linktext} name='linktext' id='linktext' placeholder='enter the url' />
                  <Lotiecontroler src="/addbtn.lottie" label="" className="cursor-pointer  pl-2 " cl="w-6 h-6" onClick={() => { handleditSubmit(link._id) }} />
                </div>) : (<div className='text-xl text-amber-950 font-bold'>{link.linktext}<Lotiecontroler src="/edit.lottie" label="" className="cursor-pointer  pl-2 " cl="w-6 h-6" onClick={() => { handleEdit(link._id) }} /></div>)}

              {showEdit2 === link._id ? (
                <div className='flex items-center gap-2'>
                  <input type="text" onChange={(e) => { handlechange2(link._id, e.target.name, e.target.value) }} value={link.link} name='link' id='link' placeholder='enter the url name' />
                  <Lotiecontroler src="/addbtn.lottie" label="" className="cursor-pointer  pl-2 " cl="w-6 h-6" onClick={() => { handleditSubmit(link._id) }} />
                </div>) : (
                <div>{link.link}<Lotiecontroler src="/edit.lottie" label="" className="cursor-pointer relative top-1 pl-2 " cl="w-6 h-6" onClick={() => { handleEdit2(link._id) }} /></div>
              )}
              </div>
              <div className='buttons '>
                <label className="inline-flex items-center me-5 cursor-pointer">
  <input type="checkbox" value="allowed" className="sr-only peer" checked={link.allowed} onChange={()=>{handleToggleAllowed}} />
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600 dark:peer-checked:bg-teal-600"></div>
  </label>

                <Lotiecontroler src="/delete.lottie" label="" className="cursor-pointer relative top-1 pl-2 " cl="w-10 h-10" onClick={() => { handleDelete(link._id) }} />
              </div>
            </div>
          </section >
        })}


      </div>
    </main>
  )
}

export default Profiles