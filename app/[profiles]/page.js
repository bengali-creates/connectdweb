import React from 'react'
import Navadmin from '@/components/Navadmin'

const Profiles = () => {
  return (
    <main>
      <Navadmin />
    <div className='bg-cyan-100 pt-7 mt-8 text-black'>
      
      <h1>ENTER THE URL</h1>
      <input type="text" name='URL' id='URL' placeholder='enter the url'/>

    </div>
    </main>
  )
}

export default Profiles