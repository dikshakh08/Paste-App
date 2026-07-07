import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { FaRegCopy } from "react-icons/fa";

const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes)

    useEffect(() => {
            if(pasteId) {
                const paste = allPastes.find((p) => p._id === pasteId)
                setTitle(paste.title)
                setValue(paste.content)
            }
          
    }, [pasteId])

     function copyContent() {
            navigator.clipboard.writeText(value);
    }
        
        

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId ||
                Date.now().toString(36),
            createdAt:new Date().toISOString(),
        }
       



        if(pasteId){
            //update
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }
        //after creation or updation
        setTitle('');
        setValue('');
        setSearchParams({});
    }

  return (
    <div className='w-full max-w-5xl mx-auto px-4'>
        <div className='flex gap-7 place-content-between'>
            <input className='p-2 rounded-2xl border-[1px] border-gray-400  flex-1'
            type="text"
            placeholder='Enter Title here...'
            value={title} 
            onChange={(e) =>setTitle(e.target.value)}/>

            <button 
            onClick={createPaste}
            className='rounded-2xl bg-blue-600 text-white p-2 flex items-center' >
                {
                    pasteId ? "Update Paste" : "Create Paste"
                }
            </button>
        </div>  
        
        <div>
           <div className="mt-10 border border-gray-300 rounded-xl overflow-hidden w-full">

            {/* Top Bar */}
            <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b">

                {/* Three Dots */}
                <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                {/* Copy Button */}
                <button
                onClick={copyContent}
                className="text-xl hover:text-blue-600 transition"
                >
                <FaRegCopy />
                </button>

            </div>

            {/* Textarea */}
            <textarea
                className="p-4 w-full text-lg outline-none resize-none"
                value={value}
                placeholder="Enter Content here..."
                onChange={(e) => setValue(e.target.value)}
                rows={20}
            />

            </div>
        </div>  
    </div>

  )
}

export default Home