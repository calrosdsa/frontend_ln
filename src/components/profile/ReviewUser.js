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
        <div className='bg-gray-900   pt-20  pb-56'>
          <div className=' p-1  rounded-2xl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-4/6 mx-auto' >
          <h1 className='text-2xl  text-gray-400'>Recent Reviews Last 20</h1>
            {data?.reviews.map(item=>(
                <div className='p-1 my-2 rounded-xl bg-gray-800'>
                  
             
                 <div className='flex justify-between'>

                  <Link  to={`novel/${item.novel_slug}`} className='flex justify-center text-indigo-400'>{item.novel_title}</Link>
             <p className="text-xs  lg:text-base mr-10"> {formatDistanceToNow(
               new Date(moment.utc(item?.date_added).local().format()),
               {
                 addSuffix: true,
                }
                )}</p>
                </div>
             <div className="flex space-x-4 items-center pt-3">
             <div className=" border-b-2 border-gray-400 w-full">
             <ReactStars
             size={20}
             count={5}
             edit={false}
             value={item?.rating}
             />
             </div>
             </div>
             <h1 className="w-full my-1 pb-1 border-b-2 border-gray-400 pb-2  text-xs sm:text-sm lg:text-base  text-white">{item?.review}</h1>
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
                 
              </div>
             </div>
            </div>
            ))}
            
            </div>
        </div>
        )
}

export default ReviewUser
