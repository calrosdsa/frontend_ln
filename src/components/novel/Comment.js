import React,{Fragment,useState,useEffect} from "react";
import axios from "axios";
import moment from 'moment'
import { formatDistanceToNow } from "date-fns";
import useSWR from 'swr'
import { fetcher } from './Review'
import ReplyComment from "./ReplyComment";
const Comment =({match})=>{
  
  
  const [show,setShow] = useState(false)
  const {data, mutate} = useSWR(`https://light-nvls.herokuapp.com/novels/comment/${match.params.id}/`,fetcher)
  useEffect(()=>{
    window.scrollTo(0 , 0)
  },[])
  return(
    
    <Fragment>
           
            <ReplyComment mutate={mutate} show={show} data={data} setShow={setShow} user={data?.added_b} commentId = {data?.id} />
              <div className={`pt-20 bg-gray-900  h-full pb-96 ${show&& 'filter brightness-50'}`}>
                <div className="bg-gray-800 p-1 rounded-xl mx-auto w-full sm:w-3/4 xl:w-4/6">
                  <div className="flex space-x-4 xl:space-x-8"> 
                <img loading="lazy" src={data?.image} className="h-20 w-20  rounded-full" alt="" />
                <div>
            <h2 class='text-xl lg:text-3xl '>{data?.added_b}</h2> 
            <h2 className='bg-gray-600 rounded-xl px-1'>Reader</h2>
                </div>
                  </div>

                  <div class='flex items-end pt-2 px-2 sm:px-5 xl:px-10 justify-between mx-1  mb-1'>
          <p class=' text-gray-200  text-2xl my-1 whitespace-pre-line'>{data?.body}</p>
                 </div>

                 
<div className='flex justify-between'>
          <p className='text-gray-500 text-base'>
            Posted{' '}
            {formatDistanceToNow(
              new Date(moment.utc(data?.date_added).local().format()),
              {
                addSuffix: true,
              }
              )}
          </p>
      
    <div class='flex items-center gap-5'>

    <svg onClick={async()=>{
      await axios.put(`/novels/postcomment/${data?.id}/`)
      mutate({...data})
    }}  xmlns="http://www.w3.org/2000/svg" class="h-4 lg:h-5 lg:w-5 w-4 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
 </svg>
      <p className='font-semibold -ml-3 '>
    {data?.count_likes}{' '}
  </p>

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
        <p className="font-semibold -ml-3 mr-2">{data?.count_reply}</p>

          <svg
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
                </div>
     
                <div className="space-y-3 mt-6 mx-auto w-full sm:w-3/4 xl:w-3/6">
                  <button onClick={()=>setShow(!show)} className="bg-indigo-400 p-1 rounded-lg text-xl font-semibold">Reply Comment</button>

                  {data?.reply_comments.map(item=>(
                      <div className="bg-gray-800 p-1 rounded-xl">
                      <div className="flex items-center space-x-4 xl:space-x-8"> 
                    <img src={item?.image} className="h-12 w-12  rounded-full" alt="" />
                    <div>
                <h2 class='text-lg lg:text-xl '>{item?.added_b}</h2> 
                <h2 className='bg-gray-600 rounded-xl px-1'>Reader</h2>
                    </div>
                      </div>
    
                      <div class='flex items-end pt-2 px-2 sm:px-5 xl:px-10 justify-between mx-1  mb-1'>
              <p class=' text-gray-200  text-lg my-1 whitespace-pre-line'>{item?.reply}</p>
                     </div>
    
                     
    <div className='flex justify-between'>
              <p className='text-gray-500 text-sm'>
                Posted{' '}
                {formatDistanceToNow(
                  new Date(moment.utc(item?.date_added).local().format()),
                  {
                    addSuffix: true,
                  }
                  )}
              </p>
          
        <div class='flex items-center gap-5'>
    
        <svg onClick={async()=>{
          mutate({...data })
          await axios.put(`/novels/comment/${item.id}/`)
          mutate({...data})
        }} xmlns="http://www.w3.org/2000/svg" class="h-4 lg:h-5 lg:w-5 w-4 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
     <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
     </svg>
          <p className='font-semibold -ml-3 '>
        {item?.like}{' '}
      </p>
    
    
              <svg
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
                    </div>
                  ))}
                </div>

                
              </div>
          </Fragment>
    )
}





export default Comment;
