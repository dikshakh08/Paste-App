import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaRegCopy, FaShareAlt, FaEye, FaEdit, FaTrash,  FaCalendarAlt } from "react-icons/fa";
import { LuCalendar } from "react-icons/lu";

const Paste = () => {
    const pastes = useSelector((state) =>
    state.paste.pastes)
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch();

    const filterData = pastes.filter(
      (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())

    )
    function handleDelete(pasteId){
      dispatch(removeFromPastes (pasteId))

    }



  return (
    <div className='flex flex-col items-center px-4'>
      
      <input 
      className='p-2 rounded-2xl border-[1px] border-gray-400 w-full max-w-5xl mx-4'
      type="search"
      placeholder='Search Paste here'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} />

      <div className='w-full flex flex-col gap-5 mt-5 max-w-5xl border-[1px] border-gray-400 pb-7'>
        <div className='p-2'>
          <h1 className='text-3xl font-bold'>All Pastes</h1>
          <hr className="my-3 border-gray-400 " /> 
          
        </div>
        {
          filterData.length > 0 &&
          filterData.map(
            (paste) => {
              return (
                <div className='border-[1px] border-gray-400 mx-4 md:mx-7 mb-2 px-2 pb-4 flex flex-row justify-between gap-4' key={paste?._id}>
                  <div className='flex flex-col items-start'>
                    <div className='font-bold text-3xl'>
                      {paste.title}
                    </div>
                    <div>
                      {paste.content}
                    </div >
                  </div>  
                  <div className='flex flex-col items-end pt-5'>
                    <div className='flex flex-row pb-1.5'>
                      <button className= 'px-2 rounded-sm hover:text-yellow-400'>
                        <Link to={`/?pasteId=${paste?._id}`}><FaEdit/></Link>
                      </button>
                      <button className=' px-2 rounded-sm hover:text-yellow-400'>
                        <Link to={`/pastes/${paste?._id}`}><FaEye/></Link>
                      </button>
                      <button
                        className=' px-2 rounded-sm hover:text-yellow-400'
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <FaTrash/>
                      </button>
                      <button
                        className=' px-2 rounded-sm hover:text-yellow-400'
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content)
                          toast.success("Copied to clipboard")
                        }}
                      >
                      <FaRegCopy/>
                      </button>
                      <button className=' px-2 rounded-sm hover:text-yellow-400'
                        onClick={() => {
                          const url = `${window.location.origin}/pastes/${paste._id}`;
                          navigator.clipboard.writeText(url);
                          toast.success("Link copied!");
                        }}
                      >
                        <FaShareAlt/>
                      </button>

                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <LuCalendar/>
                      {new Date(paste.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>    
                </div>

              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste