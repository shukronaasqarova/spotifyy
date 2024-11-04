import React from 'react'
import { TbUserPlus } from 'react-icons/tb'
import { IoClose } from 'react-icons/io5'
import { PiUserCircleDuotone } from 'react-icons/pi'

function RightBar() {
  return (
    <div className="container pl-10 pr-10 pt-9">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-stone-300">Friend Activity</h2>
        <div className="flex items-center gap-4 text-2xl">
          <TbUserPlus />
          <IoClose />
        </div>
      </div>

      <h2 className="text-sm pt-8 text-stone-500 font-semibold">
        Let friends and followers on Spotify <br /> see what you’re listening to.
      </h2>

      {[...Array(3)].map((_, index) => (
        <div key={index} className="text-6xl pt-4 flex items-center gap-4 text-stone-600">
          <PiUserCircleDuotone />
          <div className="flex flex-col gap-2">
            <b className="w-[100px] rounded-md justify-center text-[8px] flex bg-stone-600 text-stone-600">
              sd
            </b>
            <b className="w-[80px] justify-center rounded-md text-[8px] flex bg-stone-600 text-stone-600">
              sd
            </b>
            <b className="w-[80px] justify-center rounded-md text-[8px] flex bg-stone-600 text-stone-600">
              sd
            </b>
          </div>
        </div>
      ))}

      <h3 className="text-sm pt-5 text-stone-400">
        Go to Settings Social and enable “Share my listening activity on Spotify.” You can turn this off at any time.
      </h3>

      <div className="flex justify-center items-center pt-5">
        <button className="w-[200px] h-[50px] font-bold bg-white text-black rounded-3xl">
          SETTINGS
        </button>
      </div>
    </div>
  )
}

export default RightBar
