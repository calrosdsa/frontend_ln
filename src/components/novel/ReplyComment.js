import React,{Fragment, useState,useEffect} from 'react'
import axios from 'axios';

function ReplyComment({commentId,setShow,show,user,mutate,data}) {

  const [reply, setReply] = useState('');   
  useEffect(()=>{
    window.scrollTo(0, 0)
  },[])


  return (
    <Fragment>
      {show&&

                <div className=' top-1/3 inset-x-0 rounded-lg  px-2 mx-auto fixed z-20 bg-gray-800 max-w-lg '
                >
                 <div className='flex  justify-between items-center'>
                 <h1 className=' text-xl text-gray-400 border-b-2 border-gray-400 my-1 py-1'>Reply to {user}</h1>
                 <svg onClick={()=>setShow(false)} xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3  text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </div>
                 <textarea
                    className=' leading-normal resize-none 
                    w-full h-64 outline-none bg-gray-800 border-b-2 border-blue-500  py-0 px-2 font-medium placeholder-gray-200'
                    name='body'
                    placeholder='Type Your Comment'
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    required
                    ></textarea>
                  <div className='flex pb-3'>
                  <button className=' cursor-pointer md:mb-0 bg-white md:px-6 md:py-3  py-0 h-12 text-sm shadow-sm
                   font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-200'>
                  Add Spoiler
                  </button>
                     <button
                      className='mb-2 cursor-pointer md:mb-0 bg-indigo-500 md:px-6 md:py-3  py-0 h-12 text-base 
                      shadow-sm font-medium tracking-wider text-white rounded-lg mx-4 w-4/6 hover:shadow-lg hover:bg-indigo-500'
                      onClick={async() => {
                        mutate({...data})
                        await axios.post(`/novels/comment/${commentId}/`, {reply})
                        mutate({...data})
                        setReply('')
                        setShow(false)
                      }}
                      >Post Comment</button>
                  </div>
                 </div>
                    }
                      </Fragment>

  )
}

export default ReplyComment
