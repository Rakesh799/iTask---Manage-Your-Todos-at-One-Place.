import React from 'react'

const Navbar = () => {
  return (
    <div className='sticky top-0'>
      <nav className='flex justify-around bg-sky-400 py-2'>
        <div className="logo"><span className='font-bold text-2xl'>iTask</span></div>
        <ul className="flex gap-6">
            <li className='cursor-pointer hover:font-bold transition-all duration-300'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-300'>Your Tasks</li>
            
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
