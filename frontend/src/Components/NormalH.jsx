import React, { useState, useEffect } from 'react';
import { IoMenu } from "react-icons/io5";
import { Link } from 'react-router-dom';
const NHeader = ( ) => {
    const [expand, setExpand] = useState(false);
    const name=localStorage.getItem("data")
    const toggleExpand = () => {
        setExpand(!expand);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) {
                setExpand(false);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const LogOut=()=>{
        localStorage.removeItem("data")
        window.location.href="/login"
    }

    return (
        <div className={`${expand ? "h-48 border-t-2 border-black" : ""} fixed bottom-0 sm:top-0 sm:flex sm:justify-between z-50  w-full h-16 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 `}>
            <div className='flex justify-around  capitalize text-lg font-semibold py-4 sm:px-10 md:px-16 px-5'>
                <div><span className={`${expand ? "hidden" : ""} hover:cursor-pointer`}>Employee</span></div>
                
             </div>
             <button className=' mx-10 px-5 border-2 bg-red-500 border-red-600 rounded-full my-2' onClick={()=>{LogOut()}}>Logout</button>
            
        </div>
    );
}

export default NHeader;
