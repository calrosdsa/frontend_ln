import useSWR from 'swr'
import { useHistory } from 'react-router-dom'
import React,{useEffect} from 'react'
import { fetcher } from './Review'
import { Link } from 'react-router-dom'
const Chapter =({match})=>{
  const {data}  = useSWR(`https://light-nvls.herokuapp.com/novels/single_chapter/${match.params.slug}/`, fetcher )
  const history = useHistory()
    
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])



    return(
      <div className='bg-gray-900 pt-28 '>

           
<div className='flex items-center space-x-4 lg:space-x-6  pb-3 w-full sm:w-3/4 sm:mx-auto '>

<img src={data?.novel_cover} className='h-32 w-24 rounded-lg' alt="" />
<div >
  <Link to={`/novel/${encodeURIComponent(data?.novel_slug)}`} className=' text-2xl lg:text-3xl text-indigo-300 font-medium mt-2 '>{data?.novel_title}</Link>
 
   <h1 className=' text-gray-400 -mt-1 text-lg lg:text-2xl'>{data?.title}</h1>
</div>
    </div>
          <div className='w-full sm:w-3/4  bg-gray-800 mx-auto p-1 mt-5 rounded-xl'>
            <p className=' whitespace-pre-line text-2xl text-gray-400'>{data?.chapter}</p>

          </div>
          <div className='flex lg:w-3/4 mx-auto space-x-5 p-1 mt-2 border-2 border-gray-400 justify-center'>

          <button disabled={data?.previous === null} onClick={()=>data?.previous=== null || history.push(data?.previous.slug) } 
          className='text-xl bg-indigo-500 p ring-0 outline-none items-center rounded-xl flex'>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
            Prev</button>


          <div className='bg-indigo-500 p items-center rounded-xl flex'>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <Link to={`/chapters/${encodeURIComponent(data?.novel_slug)}`} className='text-xl'>Index</Link>
          </div>

         <button disabled={data?.next === null}  onClick={()=>data?.next=== null || history.push(data?.next.slug) } 
         className='text-xl bg-indigo-500 p ring-0 outline-none items-center rounded-xl flex'>Next
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
         </svg>
         </button>
          </div>
          </div>

)
}

export default Chapter;