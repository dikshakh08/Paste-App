import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {

    const {id} = useParams();
    const allPastes = useSelector((state) => state.paste.pastes)
    const paste = allPastes.filter((p) => p._id === id)[0]


  return (
   <div className='place-items-center'>
        <div className='flex gap-7 place-content-between'>
            <input className='p-2 rounded-2xl bg-neutral-200'
            type="text"
            placeholder='Enter Title here...'
            value={paste.title} 
            disabled
            onChange={(e) =>setTitle(e.target.value)}/>

          
        </div>  
        <div>
            <textarea
                className='rounded-2xl mt-10 p-4 min-w-[500px] bg-neutral-200 text-2xl' 
                value={paste.content}
                placeholder='Enter Content here...'
                disabled
                onChange={(e) => setValue(e.target.value)}
                rows={20} />
        </div>  
    </div>

  )
}

export default ViewPaste