import React from 'react'
import {Link} from 'react-router-dom'
function NovelItem({post,key}) {
    return (
        <div  key={key}>
            <div className="my-1 place-items-center   flex  rounded-xl  sm:w-full ">
             <Link to={`/novel/${post.slug}`}>
               <div className="relative ">
             <img className="2xl:h-60  2xl:w-52 xl:h-52 xl:w-44  h-40  w-32 lg:h-44 lg:w-40 sm:h-44 sm:w-32 "
              src={`https://res.cloudinary.com/farav/image/upload/v1/${post.cover}`}  alt="" />
             <div className="absolute z-0 bottom-0 items-center bg-black px-1 space-x-1 rounded-xl flex left-0">
             <svg xmlns="http://www.w3.org/2000/svg" class="sm:h-4 h-3  z-10 translate-x-2 sm:w-4 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
             </svg>
             {post.average > 0?
             <h1 className="text-xs sm:text-sm">{post.average}</h1>
             :
             <h1>0</h1>
            }
             </div>
               </div>
             <h1 className=" truncate text-xs md:text-sm 
             text-gray-400 font-semibold whitespace-pre-wrap px-1 line-clamp-1 ">{post.title}</h1>
            <div className="flex items-center space-x-2">
            <img className="w-5 h-5 md:w-4 md:h-4 text-gray-400  " src="https://img.icons8.com/ios-glyphs/60/000000/crown.png"/>
             <h1 className="text-xs text-gray-500 font-bold">Rank {post.rank}</h1>
            </div>
            <div className="flex space-x-1 my items-center">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 md:h-4 md:w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
            </svg>
            <h1 className="text-xs  text-gray-500 font-bold">{post.chapters} Charpters</h1>
            </div>
             </Link>
           </div>
        </div>
    )
}

export default NovelItem
