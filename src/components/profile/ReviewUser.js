import React from 'react'
import useSWR from 'swr'
import { fetcher } from '../novel/Review'
import { formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom'
import axios from 'axios'
function ReviewUser() {
    const {data,mutate} = useSWR('/profile/review', fetcher)
    return (
        <div className='bg-gray-900   pb-56'>
            {data?.reviews.map(item=>(
                 <div className={`w-full pb-2 border-gray-500 bg-gray-800 h-full xl:pl-5 pt-2 sm:w-4/5
                  lg:w-2/3 xl:w-4/6  sm:mx-auto px-3`}>
                <Link to={`novel/${item.novel_slug}`} className='flex justify-center '>
                  <img src={item.novel_cover} className='h-20 w-14' alt="" />
                </Link>
                  <h1 className='flex justify-center text-indigo-400'>{item.novel_title}</h1>
            
             
               <div className=' border-2 p-1 border-gray-900 rounded-2xl w--full lg:w-2/3 mx-auto' >
             <div className="flex space-x-4 items-center pt-3">
             <img className="h-11 w-11 lg:h-16 lg:w-16 rounded-full" src={item.avatar} alt="" />
             <div className=" -space-y-3">
             <h1 className=" text-blue-300">{item.user}</h1>
             <ReactStars
             size={25}
             count={5}
             edit={false}
             value={item?.rating}
             />
             </div>
             <p className="text-xs  lg:text-base mr-10"> {formatDistanceToNow(
             new Date(moment.utc(item?.date_added).local().format()),
             {
              addSuffix: true,
             }
             )}</p>
             </div>
             <h1 className="w-full my-1 pb-1  text-xs sm:text-sm lg:text-base  text-white">{item?.review}</h1>
             <div className="flex justify-between mx-2   pb-3">
              <button className="border-indigo-600 border-2 text-indigo-700 rounded-md p-0 text-xs lg:text-base">View Details</button>
              <div className="flex space-x-2 mr-7 items-center  space-x-4">
                  <div className="flex space-x-2 items-center">
              <svg onClick={async()=>{
                mutate({...data})
                await axios.put(`/novels/putreview/${item.id}/`)
                mutate({...data})
              }} xmlns="http://www.w3.org/2000/svg" class="h-4 lg:h-5 lg:w-5 w-4 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <p className="text-sm xl:text-base">{item?.like}</p>
                  </div>
                  <div className="flex space-x-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <p className="text-sm xl:text-base">{}2</p>
                  </div>
              </div>
             </div>
             </div>
             </div>
            ))}
            
        </div>
    )
}

export default ReviewUser
