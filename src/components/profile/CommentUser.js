import React from 'react'
import useSWR from 'swr'
import { fetcher } from '../novel/Review'
import moment from 'moment'
import {formatDistanceToNow} from 'date-fns'
import { Link } from 'react-router-dom'
import axios from 'axios'
function CommentUser() {
    const {data,mutate}= useSWR('/profile/comment', fetcher)

    return (
        <div className="bg-gray-900 pb-96 pt-20">
          <div class=' relative overflow-hidden pt-5 bg-gray-900 shadow-lg h-auto w-full sm:w-5/6 mx-auto 
            lg:w-3/4 xl:w-4/6  sm:rounded-lg p-1'>
         {data?.comments.map(comment=>(
           <div className='my-2 bg-gray-800 p sm:p-1 lg:p-2 lg:px-5 rounded-xl'>

                  <h1 className='text-gray-400'>Novel Comment</h1>
                <div className='flex justify-between '>
                  <Link to={`/novel/${encodeURIComponent(comment.novel_slug)}`}  className='text-indigo-400 text-lg'>{comment.novel_title}</Link>
             <h1 className='text-sm text-gray-500'>
                {moment(new Date(comment.date_added)).format('MMM d, HH:mm:ss')}
                </h1>
                </div>
            
            <h1 className='text-gray-200 border-b-2 border-t-2 pb-1 pt-1 border-gray-400  text-base my-1 whitespace-pre-line'>{comment.body}</h1>
    
    
        
      <div class='flex items-center justify-end gap-5'>
    
      <svg onClick={async()=>{
        mutate({...data })
        await axios.put(`/novels/postcomment/${comment.id}/`)
        mutate({...data})
      }} xmlns="http://www.w3.org/2000/svg" class="h-4 lg:h-5 lg:w-5 w-4 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
    </svg>
        <p className='font-semibold -ml-3 '>
      {comment.count_likes}{' '}
    </p>
    <Link className='flex items-center space-x-3' to={`/comment/${comment.id}`}>
          <svg
            fill='#FFFFFF'
            className="cursor-pointer"
            height='16'
            viewBox='0 0 48 48'
            width='16'
            >
            <path
              clip-rule='evenodd'
              d='M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z'
              fill-rule='evenodd'
              ></path>
          </svg>
          <p className="font-semibold -ml-3 mr-2">{comment.count_reply}</p>
              </Link>
    
            <svg
            onClick={async()=>{
              mutate({...data})
              await axios.delete(`/novels/postcomment/${comment.id}`)
              mutate({...data})
            }}
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-red-600 cursor-pointer '
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
                >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
              </svg>
      </div>
    </div>
    
    ))}        
    </div>
        </div>
    )
}

export default CommentUser
