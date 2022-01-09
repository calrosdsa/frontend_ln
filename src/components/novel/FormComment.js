import React,{useState} from 'react'
import axios from 'axios';

function FormComment({mutate,updated,setUpdated,data,commentId,commentBody}) {
    const [body, setBody] = useState(`${commentBody}`); 

    return (
        <div>
    
    {updated &&
      <div
      className={` h-96 max-w-lg lg:max-w-xl z-10 fixed inset-0  top-40  mx-auto bg-gray-900 rounded-lg px-4 pt-1 
      `}
      
      >
      <div className='flex  justify-between items-center'>
      <h1 className=' text-xl px-20 text-gray-400 border-b-2 border-gray-400 my-1 py-1'>Reply Comment</h1>
      <svg onClick={()=>setUpdated(false)} xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3  text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <textarea
         className=' leading-normal resize-none 
         w-full h-48 outline-none bg-gray-900 border-b-2 border-blue-500  py-0 px-2 font-medium placeholder-gray-200'
         name='body'
         placeholder='Type Your Comment'
         value={body}
         onChange={(e) => setBody(e.target.value)}
         required
       ></textarea>
       <div className='flex pb-3'>
       <button className='mb-2 cursor-pointer md:mb-0 bg-white md:px-6 md:py-3  py-0 h-12 text-base shadow-sm
        font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-200'>
       Add Spoiler
       </button>
          <button
           type='submit'
           className='mb-2 cursor-pointer md:mb-0 bg-indigo-500 md:px-6 md:py-3  py-0 h-12 text-base 
           shadow-sm font-medium tracking-wider text-white rounded-lg mx-4 w-4/6 hover:shadow-lg hover:bg-indigo-500'
           onClick={async() => {
            mutate({...data})
            await axios.put(`/novels/updated/${commentId}/`, {body})
            mutate({...data})
            setUpdated(false)
          }}
         >Post Comment</button>
       </div>
      </div>
      }   
        </div>
    )
}

export default FormComment
