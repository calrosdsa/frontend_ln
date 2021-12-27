import React from 'react'
import { Link } from 'react-router-dom'
import {LocationMarkerIcon} from '@heroicons/react/solid'
function Autocomplete({title,cover,onSelectItem,isHighLighned,rank,id,slug,chapters,average}) {
    return (
        <div>
            <Link to={(`/novel/${encodeURIComponent(slug)}`)} 
                className={` cursor-pointer rounded-xl transform transition-all hover:scale-105 hover:ease-in
                  px-2 flex space-x-2 
                  ${isHighLighned?"active h-24 bg-gray-500 rounded-xl transform transition-all scale-105 ease-in":
                 ''}  items-center`}>
                     <img className='relative  w-14 h-20' src={cover} alt="" />
                     <span className='absolute z-10 bg-gray-800 text-sm rounded-md bottom-0 left-9 w-5'>{average}</span>
                     <div className=''>
                <h1 className='text-base truncate w-40 text-gray-400 font-semibold' >{title}</h1>
                <h1>Rank {rank}</h1>
                <div className="flex space-x-1 my items-center">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 md:h-4 md:w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
            </svg>
                <h1>{chapters} chapters</h1>
                </div>
                     </div>
                </Link>
        </div>
    )
}

export default Autocomplete
