import React from 'react'
import search from '../assets/search.svg'
import library from '../assets/library.svg'
import home from '../assets/home.svg'
import like from '../assets/like.svg'


function LeftBar() {
  return (
    <div>
        <div className='flex items-center gap-5 mt-[70px] mb-[20px] ml-[30px]'>
            <img src={home} alt="home" />
            <h4>Home</h4>
        </div>
        <div className='flex items-center gap-5 mb-[20px] ml-[30px]'>
            <img src={search} alt="search" />
            <h4>Search</h4>
        </div>
        <div className='flex items-center gap-5 mb-[20px] ml-[30px]'>
            <img src={library} alt="library" />
            <h4>Your Library</h4>
        </div>
        <div className='flex items-center gap-5 mb-[20px] ml-[30px]'>
            <button className='p-[9px] bg-gray-200 text-black rounded-md'>+</button>
            <h4>Create Playlist</h4>
        </div>
        <div className='flex items-center gap-5 mb-[20px] ml-[30px]'>
            <button><img src={like} alt="like" /></button>
            <h4>Liked Songs</h4>
        </div>
    </div>
  )
}

export default LeftBar