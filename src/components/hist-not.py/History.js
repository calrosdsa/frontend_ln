import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import useSWR from 'swr'
import { fetcher } from '../novel/Review'
import moment from 'moment'
import { Link } from 'react-router-dom'

function History() {
    const {data} = useSWR('/profile/detail/',fetcher)
    return (
        <div className='bg-gray-900 h-full pb-96'>
            <div className='md:w-11/12 mx-auto lg:w-5/6 xl:w-4/6 pt-20 bg-gray-800 px-2 sm:px-10 md:px-2'>
            <Link
              to='/'
              className='flex items-center w-30 md:w-48  justify-center mb-2 md:mb-0 bg-indigo-600 md:px-6 
              md:py-3 px-10 py-0 h-12 text-sm shadow-sm font-medium tracking-wider text-white rounded-lg hover:shadow-lg
               hover:bg-indigo-500'
              >
              {' '}
              <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3 w-3 text-white mr-1'
              viewBox='0 0 20 20'
              fill='currentColor'
              >
              <path
              fillRule='evenodd'
              d='M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z'
              clipRule='evenodd'
              />
              </svg>
              Back to Home
              </Link>
                <h1 className='text-2xl text-gray-400'>The books you read most.</h1>
                <h1 className='text-gray-500'>You can only see the last 20 of the novels you have read.</h1>
                <h1 className=' text-gray-500 italic'>Your instant checks can be misleading. The data shown is updated every few hours.</h1>
                <div className='md:grid md:grid-cols-6 hidden md:pt-5 md:border-b-2 md:border-gray-400 text-gray-300 font-semibold ' >
                    <h1 className='col-span-3'>Novel Title</h1>
                    <h1 className='col-start-4'>Progress</h1>
                    <h1 className='col-start-5 col-span-2'>Last Read</h1>

                </div>
            {data?.map(item=>(
                
                <div className='flex space-x-3 pb-1 pt-1 border-b-2 border-gray-400 md:grid md:grid-cols-6'>
                    <div className='md:col-span-3 md:flex md:space-x-4'>
                    <img className='md:col-start-1 rounded-lg md:col-span-3 md:w-9 md:h-12 w-20 h-28' src={item.novel_cover} alt="" />
                    <div className='hidden md:flex md:flex-col '>
                        <Link to={`/novel/${encodeURIComponent(item.novel_slug)}`}  className='text-sm text-gray-400 font-semibold text-gra-400 line-clamp-1'>{item.novel_title}</Link>
                        <h1 className='text-sm text-gray-500'>Rank {item.rank}</h1>

                    </div>
                    </div>
                    <div className='md:hidden '>  
                        <Link to={`/novel/${encodeURIComponent(item.novel_slug)}`} className='  line-clamp-1 text-base font-semibold text-gray-400'>{item.novel_title}</Link>
                        <h1 className=' text-sm font-semibold text-gray-400'>Rank {item.rank}</h1>
                        <h1 className=' text-sm text-gray-500'>Progress: {item.progress}/{item.chapters} (%{(item.progress / item.chapters * 100).toFixed(1)})</h1>
                        <h1 className='text-sm text-gray-500'>Last Read: 
                        {formatDistanceToNow(
                           new Date(moment.utc(item.updated).local().format('MMM d, HH:mm:ss'))
                        )}
                        </h1>
                        <Link to={`/chapter/${encodeURIComponent(item.last_chapter_slug)}`} className='text-sm line-clamp-1 text-indigo-500 '>{item.last_chapter}</Link>
                    </div>
                    <h1 className='hidden lg:mt-2 md:block md:text-gray-400 md:text-xs lg:text-sm '>{item.progress}/{item.chapters} (%{(item.progress / item.chapters * 100).toFixed(1)}) </h1>
                    <div className='hidden md:block md:col-span-2 '>
                    <h1 className='text-sm text-gray-500'>Last Read: {moment(new Date(item.viewed_on)).format('MMM d, HH:mm:ss')}</h1>
                        <Link to={`/chapter/${encodeURIComponent(item.last_chapter_slug)}`} className='text-sm line-clamp-1 text-indigo-500 '>{item.last_chapter}</Link>
                    </div>
                </div>
                ))}
                </div>
        </div>
    )
}

export default History
