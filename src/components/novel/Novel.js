import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { useEffect,Fragment,useState } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import { fetcher } from './Review'
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

    const {data,mutate,trigger}  = useSWR(`/novels/detail/${match.params.slug}/`, fetcher )
     
    const [open,setOpen]=useState(false)
    const [added,setAdded]= useState(false)
    const [body, setBody] = useState(''); 
    const avg = parseFloat(data?.average)
    useEffect(() => {
      if(!data) return;
      if(!auth.user) return;
      if (data.book_marked.includes(auth.user.pk)) {
        setAdded(true);
    } else {
      setAdded(false);
    }
  }, [data,auth]);
  
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
           type='submit'
           className='mb-2 cursor-pointer md:mb-0 bg-indigo-500 md:px-6 md:py-3  py-0 h-12 text-base 
           shadow-sm font-medium tracking-wider text-white rounded-lg mx-4 w-4/6 hover:shadow-lg hover:bg-indigo-500'
           onClick={async() => {
            mutate({...data})
            await axios.post(`/novels/postcomment/${data?.id}/`, {body})
            mutate({...data})
            setOpen(false)
          }}
         >Post Comment</button>
       </div>
      </div>
      }   

      <div className={`bg-gray-900 `}>
           <div className={` w-full lg:w-150 px-3 sm:px-5  mx-auto ${open && ' filter brightness-50'}`}>
       <div className=" justify-center - relative z-0 items-center lg:grid lg:grid-cols-5  bg-gray-900 h-screen">

         <img className="h-100 lg:h-200 w-screen hidden lg:inline-flex absolute
          filter brightness-25 blur-2xl p-2  border-8 
           justify-center" src={data?.cover} alt="" />

         <img className=" xl:rounded-lg h-100  sm:w-2/3 lg:w-full mx-auto lg:col-start-2 col-span-1 z-0 filter  relative 
          pt-16 brightness-75 " src={data?.cover} alt="" />
         <div className="lg:col-start-3 z-0 absolute lg:relative px-2 sm:mx-10 md:mx-28 inset-0 
          bottom-0 col-span-2 lg:ml-10 items-center top-1/2 lg:top-16 lg:mt-2 ">
         <h1 className=" font-bold  text-3xl  ">{data?.title}</h1>
         <h1 className="text-gray-400 font-semibold">{data?.sub}</h1>
         <h1>{data?.authors}</h1>
         
         <div className="flex items-center space-x-2 md:w-96">
           {data?.rank &&(
             <div className='flex items-center space-x-3'>
               <strong className="text-yellow-300 font-bold text-lg">RANK {data?.rank}</strong>
               <ReactStars
               value={avg}
               count={5}
               isHalf={true}
               edit={false}
               size={25}
               />
               <h1 className=" font-semibold mx-2 text-2xl w-16 truncate ">{data?.average}</h1>
             </div>
         
        
           )}
         </div>

         <div className=" mb-1 mt-1 lg:flex  lg:space-x-7 lg:divide-x-2 grid grid-cols-2 ">
           <button className="lg:hidden place-items-center m rounded-xl p   bg-blue-500">
             <p className="text-sm ">CONTINUE READING</p>

             <p className="text-sm sm:text-base">CHAPTER </p>
           </button>
          {auth === null || (
           <button onClick={async()=>{
            mutate({...data})
           await axios.post(`/novels/favorites-products/update/${data?.id}/`)
           mutate({...data})
          }} className="lg:hidden p text-base m 
           rounded-xl  place-items-center bg-blue-500">
             {added? 
             <p className="text-sm sm:text-base">IN LIBRARY</p>  
             :
             <p >ADD LIBRARY</p>
           }
           </button>)
           }
           <div className="flex flex-col bg-gray-700 m  lg:bg-transparent  lg:rounded-none  p rounded-xl">
           <h1 className="text-base text-gray-200">Chapters:</h1>
           <div className="flex items-center space-x-3 ">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
          </svg>
           <h1 className="text-2xl font-bold">{data?.chapters}</h1>
           </div>
         </div>
         <div className="bg-gray-700 m  lg:bg-transparent  lg:rounded-none  p rounded-xl">
           <h1 className="lg:ml-5">Views</h1>
           <div className="lg:ml-5 flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
<path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
           </svg>
           <h1 className="text-2xl font-bold lg:ml-2" >{numFormatter(data?.novel_views)}</h1>
         </div>
           </div>


           <div className="bg-gray-700 m  lg:bg-transparent  lg:rounded-none  p rounded-xl">
           <h1 className="text-base lg:ml-5 text-gray-200">BookMarket:</h1>
           <div className="flex lg:ml-5 items-center">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
           <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
           </svg>
           <h1 className="text-2xl font-bold lg:ml-2" >{data?.book_marked.length}</h1>
           </div>
           </div>
           <div className="bg-gray-700 m  lg:bg-transparent  lg:rounded-none  p rounded-xl">
           <h1 className="text-base lg:ml-5 text-gray-200">Status:</h1>
           <div className="flex lg:ml-5 items-center">
           <h1 className="text-2xl text-red-500 font-bold lg:ml-2" >{data?.statuss}</h1>
           </div>
           </div>

           </div>
         <div className=" mx-auto">
           <p className=" lg:text-gray-300 text-sm font-bold">CATEGORIES:</p>
           <div className=" font-bold text-base flex flex-wrap   ">
           {data?.category.map((item)=>
           <div className="bg-gray-800  rounded-lg p m">
             <Link to={`/genre/?category=${item.id}`}>
                 <h1>{item.title}</h1>
               </Link>
           </div>
           )}
           </div>
          
         </div>
         <div className="lg:flex lg:space-x-14 hidden ">
           <button className="flex flex-col text-sm rounded-xl px-6 bg-blue-500">
             <p>CONTINUE READING</p>
             <p>CHAPTER </p>
           </button>

           <button onClick={async()=>{
             mutate({...data})
            await axios.post(`/novels/favorites-products/update/${data?.id}/`)
            mutate({...data})
           }} className="flex flex-col  text-sm rounded-xl px-6 bg-blue-500">
             {added?
             <p>IN LIBRARY</p>  
             :
             <p >ADD LIBRARY</p>
           }
           </button>

         </div>
         
         </div>
           </div>
           <div className="lg:flex pt-28  lg:pt-1 lg:w-4/5  lg:mx-auto  space-y-1 lg:space-y-0
            lg:justify-between lg:space-x-14 
           grid grid-rows-2 mx-auto px-2 sm:px-6 ">

             <div className="bg-gray-300 p-1   mx-auto lg:p-3 w-5/6  lg:w-2/4 relative rounded-xl">
             <Link to={(`/chapters/${encodeURIComponent(data?.slug)}`)}>
               <h1 className="text-3xl font-medium text-gray-600">NOVEL CHAPTERS</h1>
               <h4 className="text-gray-500 xl:text-lg mt-1">Chapter {data?.chapters} Clousure</h4>
               <h4 className="text-gray-500 xl:text-lg">Updated {' '}
               {formatDistanceToNow(
                 new Date(moment.utc(data?.update_at).local().format()),
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
               <div className="bg-green-100 p-1 mx-auto lg:p-3 w-5/6  lg:w-2/4 relative rounded-xl">
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
           <h1 className=" whitespace-pre-line text-base tracking-wider mx-10">{data?.sumary}</h1>
           </div>
           <div className="mt-10 lg:w-4/5 lg:mx-auto">
           <h1 className="text-3xl border-b-2 p border-gray-500 my-4 font-semibold text-gray-500">Tags</h1>
           <div className=" lg:space-x-5 flex-wrap flex ">
           {data?.tags.map((item)=>(
             <div className="bg-gray-700  rounded-lg p m">
             <Link to={(`/tag/${encodeURIComponent(item.slug)}/?ordering=-popular&`)}>
                 <h1>{item.title}</h1>
               </Link>
           </div>
             ))}
             </div>
           </div>
       
       <div className={`flex flex-col relative  mt-24 gap-y-3 lg:w-4/5 lg:mx-auto  ${open&& ''} `}>
           <div className=" justify-between items-center flex w-full sm:w-5/6 mx-auto">
         <h2 className='text-3xl  font-bold'>User Comments</h2>
         <button onClick={()=>setOpen(!open)}
          className=" bg-gradient-to-l from-blue-300  to-blue-400 text-base font-semibold hover:scale-105
           transform hover:transition-all hover:duration-700 text-gray-100 p-1 rounded-lg ">
            WRITHE COMMENT</button>
                   
           </div>

        <p className="w-full sm:w-5/6 mx-auto bg-gray-800 p-1 border-2 border-gray-700 font-medium text-lg">It is used only as a discussion area. If you want to evaluate and score, use the "Write Review" field.
Posting insults, swearing or links in the comments is strictly prohibited.
The responsibility for the content in the comments belongs entirely to the user and certainly the LNP platform cannot be held responsible.</p>
         {data?.comments.map((comment) => (
           

    <div class='relative overflow-hidden bg-gray-800 shadow-lg h-auto w-full sm:w-5/6 mx-auto  border-gray-700 border-2  sm:rounded-lg p-1'>
                
          <div className='flex space-x-5 items-center w-full justify-between'>
            <div className='flex space-x-4'>
        <img class='rounded-full h-16 w-16' src={comment.image} />
        <div>
          <h2 class='text-xl lg:text-3xl '>{comment.added_b} {comment.id}</h2> 
          <h2 className='bg-gray-600 rounded-xl text-base w-16 px-1'>Reader</h2>
        </div>
            </div>
        <Link className='pr-5 bg-indigo-600 p rounded-lg' to={`/comment/${comment.id}`}>View Details</Link>
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

      <svg
        fill='#FFFFFF'
        onClick={()=>setOpen(!open)}
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

      {!auth && comment.added_b === auth.user.username && (
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
        )}
         <Link to={`/comment/${comment.id}`} className="text-lg mr-3">Reply?</Link>
  </div>
</div>



    </div>
             
             ))
           }
         
       </div>
         </div>
   </div>
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