import useSWR from 'swr'
import { useHistory } from 'react-router-dom'
import React,{useState,useRef,useEffect,Fragment,Suspense} from 'react'
import { fetcher } from './Review'
import { setFont, setSize} from '../../actions/webSockets'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Item from './Item'
import Item2 from './Item2'


const FontType = [
  {
    "status": "sans",
  },
 {
     "status": "serif",
 },
 {
   "status": "mono",
  },
{
  "status": "bold",
},
{
"status": "black",
}
]
const FontSize = [

  {
      "status": "16",
      "text": "base"
  },
  {
      "status": "18",
      "text": "lg"

  },
  {
      "status": "20",
      "text": "xl"

  },
  {
    "status": "22",
    "text": "2xl"

 },

 {
   "status": "24",
   "text": "3xl"

  },
  {
    "status": "26",
    "text": "4xl"

  },
 
]
const Chapter =({match})=>{
  const {data}  = useSWR(`https://light-nvls.herokuapp.com/novels/single_chapter/${match.params.slug}/`, fetcher )
  
  const history = useHistory()
  const chapterRef = useRef()
  const {fontSize} =useSelector(state => state.websockets.fontSize)
  const {fontType} =useSelector(state => state.websockets.fontType)
  const [show,setShow] = useState(false)
  const dispatch = useDispatch()
  useEffect(()=>{
    window.scrollTo(0,0)
  },[data])
  

  
  const fontsize = localStorage.getItem("fontSize");
  const fonttype = localStorage.getItem("fontType");
  
  
  return(
    <Fragment>
      {data?

<div className=' grid'>
    {show&&
        <div className='bg-gray-900 sm:w-2-4 lg:w-1/3  fixed w-11/12  inset-x-0 mx-auto top-1/2  rounded-xl p-1'  >
        
          <div className=' lg:w-3/4 mx-auto flex justify-center space-x-5 p-1 '>
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
    <div className='flex fon flex-wrap space-x-2  justify-center'>
    {FontType.map((item,i)=>(
      <Item dispatch={dispatch} fontsize={fonttype} item={item.status} setSize={setFont} i={i}/>
      
      ))}
    </div>
     <div className='flex text-xl  items-center flex-wrap space-x-2 mt-2 justify-center '>
       <h1 >A-</h1>
    {FontSize.map((item,i)=>(
      <Item2 dispatch={dispatch} fontsize={fontsize} item={item} setSize={setSize} i={i}/>
      ))}
      <h1>A+</h1>
    </div>
        </div>
    }
        
      <div onClick={()=>setShow(!show)} className='bg-gray-900 pt-28 '>
<div className='flex lg:px-10 justify-between items-center space-x-4  lg:space-x-6  pb-3 w-full sm:w-3/4 sm:mx-auto '>

<div >
  <Link to={`/novel/${encodeURIComponent(data?.novel_slug)}`} className=' text-2xl lg:text-3xl text-indigo-300 font-medium mt-2 '>{data?.novel_title}</Link>
 
   <h1 className=' text-gray-400 -mt-1 text-lg lg:text-2xl'>{data?.title}</h1>
</div>
<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setShow(!show)} 
className='h-14 cursor-pointer text-indigo-400 x w-14 hidden md:flex' fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
    </div>
          <div ref={chapterRef} className='w-full sm:w-3/4  bg-gray-800 mx-auto p-1 mt-5 rounded-xl'>
            <p className={` whitespace-pre-line font-${fontType?fontType:fonttype}
              text-gray-400 content-center text-${fontSize? fontSize:fontsize}`}>{data?.chapter}</p>

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

         <button disabled={data?.next === null}  onClick={()=>data?.next=== null || history.push(data?.next.slug)} 
         className='text-xl bg-indigo-500 p ring-0 outline-none items-center rounded-xl flex'>Next
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
         </svg>
         </button>
          </div>
          </div>

         </div>
         :
         <div className='bg-gray-900 h-screen'>...loading</div>
        }
         </Fragment>
         )
}

export default Chapter;