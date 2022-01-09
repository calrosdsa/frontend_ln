import FormComment from './FormComment'
import { Link } from 'react-router-dom'
import React,{useState} from 'react' 
import { TrashIcon,PencilAltIcon } from '@heroicons/react/outline'
import { formatDistanceToNow } from 'date-fns'
import ReplyComment from './ReplyComment'
import moment from 'moment'
import axios from 'axios'
function Comments({comment,data,mutate}) {
    const [updated,setUpdated] = useState(false)
    const [show,setShow] = useState(false)
    
    return (
        <div>
             <div class='relative overflow-hidden bg-gray-800 shadow-lg h-auto w-full sm:w-5/6 mx-auto  border-gray-700 border-2  sm:rounded-lg p-1'>
                
                <div className='flex space-x-5 items-center w-full justify-between'>
                  <div className='flex space-x-4'>
              <img class='rounded-full h-16 w-16' src={comment.image} />
              <div>
                <h2 class='text-xl lg:text-3xl '>{comment.added_b} {comment.id} </h2> 
                <h2 className='bg-gray-600 rounded-xl text-base w-16 px-1'>Reader</h2>
              </div>
                  </div>
                  {data?.user.map(item=>(
      
                    comment.added_by === item.id &&(
                      <div className='flex space-x-3'>
                      <PencilAltIcon onClick={()=>setUpdated(!updated)} className='h-6 w-6  -mt-2 cursor-pointer'/>
                      <FormComment commentBody={comment.body} data={data} updated={updated} commentId={comment.id} setUpdated={setUpdated} mutate={mutate} />
                      <TrashIcon  onClick={async()=>{
              
              await axios.delete(`https://light-nvls.herokuapp.com/novels/postcomment/${comment.id}/`)
              mutate({...data})
            }} className='h-6 w-6 text-red-500 cursor-pointer  -mt-2'/>
            
                      </div>
                    )
                    ))}
                </div>
                <div class='flex items-end pt-2 px-2 sm:px-5 xl:px-10 justify-between mx-1  mb-1'>
              <p class=' text-gray-200  text-base my-1 whitespace-pre-line'>{comment.body}</p>
        </div>
      
      
      <div className='flex justify-between'>
              <p className='text-gray-500 text-sm'>
                Posted{' '}
                {formatDistanceToNow(
                  new Date(moment.utc(comment.date_added).local().format()),
                  {
                    addSuffix: true,
                }
                )}
              </p>
          
        <div class='flex items-center gap-5'>
      
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
      <Link to={`/comment/${comment.id}`}>
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
                </Link>
            <p className="font-semibold -ml-3 mr-2">{comment.count_reply}</p>
      

               <h1  onClick={()=>setShow(!show)}  className=" cursor-pointer text-lg mr-3">Reply?</h1>
          <ReplyComment mutate={mutate} data={data} show={show} setShow={setShow} user={comment.added_b} commentId = {comment.id} />
        </div>
      </div>
      
      
      
          </div>
                   
        </div>
    )
}

export default Comments
