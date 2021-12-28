import useSWR from 'swr'
import React from 'react'
import { fetcher } from './Review'
const Chapter =({match})=>{
  const {data}  = useSWR(`/novels/single_chapter/${match.params.slug}/`, fetcher )
    




    return(
          <div className='bg-gray-900 '>
          <div className="bg-gray-800 pb-4 rounded-xl pt-24 px-3 xl:w-3/4 flex space-x-4 lg:space-x-6 items-center mx-auto">
              <img src={data?.novel_cover} className='h-28 w-20' alt="" />
              <div classname="flex ">
              <h1 className='text-3xl text-indigo-300'>{data?.novel_title}</h1>
              <h1 className='text-2xl text-gray-400'>{data?.title}</h1>
              </div>
          </div>
          <div className='w-full sm:w-3/4 bg-gray-800 mx-auto p-3 mt-5 rounded-xl'>
             <p className=' whitespace-pre-line text-2xl text-gray-400'>{data?.chapter}</p>
          </div>
          </div>

    )
}

export default Chapter;