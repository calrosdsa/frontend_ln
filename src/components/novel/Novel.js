import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { useEffect,Fragment,useState,useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import useSWR from 'swr'
import { formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import { fetcher } from './Review'
import Comments from './Comments'
import ReactStars from "react-rating-stars-component";
    const Novel =( { auth
    ,match})=>{
      useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      function numFormatter(num) {
        if(num > 999 && num < 1000000){
            return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
        }else if(num > 1000000){
            return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
        }else if(num < 900){
            return num; // if value < 1000, nothing to do
        }
    }

    const {data,mutate}  = useSWR(`https://light-nvls.herokuapp.com/novels/detail/${match.params.slug}/`, fetcher )
    const buttonRef = useRef()
    const [open,setOpen]=useState(false)
    const [added,setAdded]= useState(false)
    const token = localStorage.getItem('token')
    
    const [body, setBody] = useState(''); 
    useEffect(() => {
      if(!data) return;
      if(!auth.user) return;
      if (data.book_marked.includes(auth.user.pk)) {
        setAdded(true);
    } else {
      setAdded(false);
    }
  }, [data,auth]);
  
  function commentClick(){
    if (!auth.user){
      buttonRef.current.textContent = 'Login First!'
    }else{
      setOpen(true)
    }
//      setOpen(true)
  }
//  useEffect(()=>{
  //  setTimeout(()=>{
    //buttonRef.current.textContent = 'Login First'
    //},5000)
  //},[])
 
  return(
    <Fragment>
 
 
{open &&
      <div
      className={` max-w-lg lg:max-w-xl z-10 fixed inset-x-0 mt-32  mx-auto bg-gray-800 rounded-lg px-4 pt-1 
       ${open && 'filter  brightness-100'} `}
      
      >
      <div className='flex  justify-between items-center'>
      <h1 className=' text-xl text-gray-400 border-b-2 border-gray-400 my-1 py-1'>Reply Comment</h1>
      <svg onClick={()=>setOpen(false)} xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3  text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <textarea
         className=' leading-normal resize-none 
         w-full h-64 outline-none bg-gray-800 border-b-2 border-blue-500  py-0 px-2 font-medium placeholder-gray-200'
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
           className='mb-2 cursor-pointer md:mb-0 bg-indigo-500 md:px-6 md:py-3  py-0 h-12 text-base 
           shadow-sm font-medium tracking-wider text-white rounded-lg mx-4 w-4/6 hover:shadow-lg hover:bg-indigo-500'
           onClick={async() => {
            await axios.post(`https://light-nvls.herokuapp.com/novels/postcomment/${data?.id}/`, {body})
            mutate({...data})
            setOpen(false)
          }}
         >Post Comment</button>
       </div>
      </div>
      }   
    
    {data?
 
 <div className={`bg-gray-900 `}>
           <div className={` w-full lg:w-150 px-3 sm:px-5  mx-auto ${open && ' filter brightness-50'}`}>
             <div className=" justify-center - relative z-0 items-center lg:grid lg:grid-cols-3 xl:grid-cols-5  bg-gray-900 h-screen">

         <img className=" object-cover h-99 w-screen hidden lg:inline-flex absolute
          filter brightness-25 blur-xl p-2  border-8 
          justify-center" src={data?.cover} alt="" />

         <img className=" xl:rounded-lg h-100 object-contain  sm:w-2/3 lg:w-full mx-auto
          lg:col-start-1 xl:col-start-2  z-0 filter  relative 
          pt-16 brightness-75 " src={data?.cover} alt="" />
         <div className="lg:col-start-2 xl:col-start-3  z-0 absolute lg:relative px-2 sm:mx-10 md:mx-28 inset-0 
          bottom-0 col-span-3 lg:ml-10 items-center top-1/2 lg:top-16 lg:-mt-14 ">
         <h1 className=" font-bold  text-3xl  ">{data?.title}</h1>
         <h1 className="text-gray-400 font-semibold">{data?.sub}</h1>
         <h1>{data?.authors}</h1>
         
         <div className="flex items-center space-x-2 md:w-96">
             <div className='flex items-center space-x-3'>
               <strong className="text-yellow-300 font-bold text-lg">RANK {data?.rank}</strong>
               {data?.average&& 
               <ReactStars
               value={data?.average}
               count={5}
               isHalf={true}
               edit={false}
               size={25}
               />
              }
               <h1 className=" font-semibold mx-2 text-2xl w-16 truncate ">{data?.average}</h1>
             </div>
         </div>

         <div className=" mb-1 mt-1 lg:flex gap-x-2  lg:divide-x-2 grid grid-cols-2 ">
         {data?.last_chapter ?
             <Link to={`/chapter/${encodeURIComponent( data?.last_chapter.last_chapter_slug.includes('chapter')?data?.last_chapter.last_chapter_slug:data?.first.slug)}`} 
             className=" flex flex-col items-center 
             text-sm rounded-xl p px-4 justify-center bg-indigo-600">
             <p>CONTINUE READING</p>
             <p className='truncate line-clamp-1 w-32'>
               
               {data?.last_chapter.last_chapter_title.includes('Chapter')? data?.last_chapter.last_chapter_title:data?.first.title }
               </p>
           </Link>
:
<Link to={`/chapter/${encodeURIComponent(data?.first.slug)}`} className=" flex flex-col items-center 
text-sm rounded-xl p px-4 justify-center bg-indigo-600">
<p>Read</p>
<p className='truncate line-clamp-1 w-32'>{data?.first.title} </p>
</Link>
}

<button 
disabled={!auth.user}
onClick={async()=>{
  await axios.post(`https://light-nvls.herokuapp.com/novels/favorites-products/update/${data?.id}/`)
  mutate({...data})
}} className="flex  justify-center items-center lg:hidden text-sm rounded-xl  bg-indigo-600">
     {!auth.user? (
              <div className=' line-clamp-2'>
              <p>
                Library
              </p>
              <p>
                Disabled
              </p>
              </div>
              )
              :
              added?
              <p>IN LIBRARY</p>  
              :
              <p >ADD LIBRARY</p>
            }
</button>
           <div className="flex flex-col bg-gray-700 m  lg:bg-transparent  lg:rounded-none  p rounded-xl">
           <h1 className="text-base text-gray-400 font-semibold">Chapters:</h1>
           <div className="flex items-center space-x-3 ">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
          </svg>
           <h1 className="text-2xl font-bold text-gray-400">{data?.chapters}</h1>
           </div>
         </div>
         <div className="bg-gray-700 m  lg:bg-transparent  lg:rounded-none  p rounded-xl">
           <h1 className="lg:ml-5 text-gray-400 font-semibold">Views</h1>
           <div className="lg:ml-5 flex space-x-3 items-center">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
<path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
           </svg>
           <h1 className="text-2xl font-bold lg:ml-3 text-gray-400" >{numFormatter(data?.novel_views)}</h1>
         </div>
           </div>


           <div className="bg-gray-700 m  lg:bg-transparent  lg:rounded-none  p rounded-xl">
           <h1 className="text-base lg:ml-5 text-gray-400 font-semibold">BookMarket:</h1>
           <div className="flex lg:ml-5 items-center">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
             <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
           </svg>
           <h1 className="text-2xl font-bold lg:ml-2 text-gray-400" >{data?.book_marked.length}</h1>
           </div>
           </div>
           <div className="bg-gray-700 m  lg:bg-transparent  lg:rounded-none  p rounded-xl">
           <h1 className="text-base lg:ml-5 text-gray-400 font-semibold">Status:</h1>
           <div className="flex lg:ml-5 items-center">
           <h1 className="text-2xl text-red-500 font-bold lg:ml-2" >{data?.statuss}</h1>
           </div>
           </div>

           </div>
         <div className=" mx-auto">
           <p className=" lg:text-gray-300 text-sm font-bold">Categories:</p>
           <div className=" text-base pb-2 flex flex-wrap col-full">
           {data?.category.map((item)=>
           <div className="bg-gray-600  rounded-lg p m">
             <Link to={`/genre/?category=${item.id}`}>
                 <h1>{item.title}</h1>
               </Link>
           </div>
           )}
           </div>
          
         </div>
         <div className="lg:flex lg:space-x-14 hidden ">
        {data?.last_chapter ?
             <Link to={`/chapter/${encodeURIComponent( data?.last_chapter.last_chapter_slug.includes('chapter')?data?.last_chapter.last_chapter_slug:data?.first.slug)}`} 
             className=" flex flex-col items-center w-28 lg:w-48 
             text-sm rounded-xl p px-4 justify-center bg-indigo-600">
             <p>CONTINUE READING</p>
             <p className='truncate line-clamp-1 w-32'>
               
               {data?.last_chapter.last_chapter_title.includes('Chapter')? data?.last_chapter.last_chapter_title:data?.first.title }
               </p>
           </Link>
:
<Link to={`/chapter/${encodeURIComponent(data?.first.slug)}`} className=" flex flex-col items-center w-28 lg:w-48 
text-sm rounded-xl p px-4 justify-center bg-indigo-600">
<p>Read</p>
<p className='truncate line-clamp-1 w-32'>{data?.first.title} </p>
</Link>
}
           <button
           disabled={!auth}
           onClick={async()=>{
             await axios.post(`https://light-nvls.herokuapp.com/novels/favorites-products/update/${data?.id}/`)
             mutate({...data})
            }} className={`flex  justify-center items-center p h-14 w-28 text-sm rounded-xl px-6
            bg-indigo-600`}>
            {!auth.user? (
              <div className=' line-clamp-2'>
              <p>
                Library
              </p>
              <p>
                Disabled
              </p>
              </div>
              )
              :
              added?
              <p>IN LIBRARY</p>  
              :
              <p >ADD LIBRARY</p>
            }
           </button>

         </div>
         
         </div>
           </div>
           <div className="md:flex pt-44 mt-2  sm:pt-40   lg:pt-1 lg:w-4/5  lg:mx-auto  space-y-5 md:space-y-0
            lg:justify-between md:space-x-6 lg:space-x-14 
            mx-auto px-1 sm:px-6 ">

             <div className="bg-gray-300 p mt-2  mx-auto lg:p-3 w-11/12  lg:w-2/4 relative rounded-xl">
             <Link to={(`/chapters/${encodeURIComponent(data?.slug)}`)}>
               <h1 className="text-3xl font-medium text-gray-600">NOVEL CHAPTERS</h1>
               <h4 className="text-gray-500 xl:text-lg mt-1">Chapter {data?.chapters} Clousure</h4>
               <h4 className="text-gray-500 xl:text-lg">Updated {' '}
               {formatDistanceToNow(
                 new Date(moment.utc(data?.updated).local().format()),
                 {
                   addSuffix: true,
                  }
                  )}
                </h4> 
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 xl:w-20 xl:h-20 absolute
                 text-gray-600 right-6 top-9" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                   </Link>
               </div>
               <div className="bg-green-100 p mt-2 mx-auto lg:p-3 w-11/12  lg:w-2/4 relative rounded-xl">
               <Link to={(`/reviews/${encodeURIComponent(data?.slug)}`)}>
               <h1 className="text-3xl font-medium text-gray-600">USER REVIEWS</h1>
               <h4 className="text-gray-500 xl:text-lg mt-1">Reviews from {data?.reviews} readers</h4>
               <div className="text-gray-500 flex xl:text-lg mx-3">Average score is {' '}
                <p className="mx-3 w-12 truncate">{data?.average}</p>
                </div> 
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 xl:w-20 xl:h-20 absolute
                 text-gray-600 right-6 top-9" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                   </Link>
               </div>
           </div>
           <div className="p lg:p-3 lg:w-4/5 lg:mx-auto bg-gray-700 rounded-xl mx-2  my-1 lg:my-6">
             <p>{data?.description}</p>
           </div>
           
           <div className="lg:w-4/5 lg:mx-auto">
           <h1 className="text-3xl border-b-2 p border-gray-500 my-4 font-semibold text-gray-500">Sumary</h1>
           <p className=" whitespace-pre-line text-base mx-5">{data?.sumary}</p>
           </div>
           <div className="mt-10 lg:w-4/5 lg:mx-auto">
           <h1 className="text-3xl border-b-2 p border-gray-500 my-4 font-semibold text-gray-500">Tags</h1>
           <div className=" lg:space-x-5 flex-wrap flex ">
           {data?.tags.map((item)=>(
             <div className="bg-gray-700  rounded-lg p m">
             <Link to={`/tag/?tags=${item.id}`}>
                 <h1>{item.title}</h1>
               </Link>
           </div>
             ))}
             </div>
           </div>
       
       <div className={`flex flex-col relative  mt-24 gap-y-3 lg:w-4/5 lg:mx-auto  ${open&& ''} `}>
         <div className=" justify-between items-center flex w-full sm:w-5/6 mx-auto">
         <h2 className='text-base sm:text-xl lg:text-3xl  font-bold'>User Comments</h2>
         <button ref={buttonRef}  onClick={()=>commentClick()}
          className=" bg-gradient-to-l from-blue-300  to-blue-400 text-base font-semibold hover:scale-105
           transform hover:transition-all hover:duration-700 text-gray-100 p-1 rounded-lg ">
            WRITHE COMMENT</button>
                   
           </div>
         <span className="ml-1" id="username-taken" style={{ color: '#f00', display: 'none', fontWeight: 'bold' }}>
           Nome de usuário já existe</span>
    
        <p className="w-full sm:w-5/6 mx-auto bg-gray-800 p-1 border-2 border-gray-700 font-medium text-sm sm:text-base">It is used only as a discussion area. If you want to evaluate and score, use the "Write Review" field.
Posting insults, swearing or links in the comments is strictly prohibited.
The responsibility for the content in the comments belongs entirely to the user and certainly the LNP platform cannot be held responsible.</p>
         {data?.comments.map((comment) => (
           <div>
                <Comments data={data} mutate={mutate} comment={comment}/>
              </div>   
             ))
           }
         
       </div>
         </div>
   </div>
   :
   <div className='bg-gray-900 h-screen'>...loading</div>
    
    }
     </Fragment>
     )
}

Novel.propTypes = {
  auth: PropTypes.object.isRequired,
    };
    
    const mapStateToProps = (state) => ({
      auth: state.auth,
    });
    
    export default connect(mapStateToProps)(Novel);        