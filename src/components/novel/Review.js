import { useEffect,Fragment,useState,useRef } from 'react'
import ReactLoading from 'react-loading'
import { formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import useSWR from 'swr'
import ReactStars from "react-rating-stars-component";
import axios from 'axios'
export const fetcher = url => axios.get(url).then(res => res.data)
    const Review =( {match})=>{
  
   
      const {data,trigger,mutate}  = useSWR(`https://light-nvls.herokuapp.com/novels/postreview/${match.params.slug}/`, fetcher )

    const headerRef = useRef()
    const [show,setShow]=useState(false)
    const [rating,setRating] = useState()
    const [review,setReview] = useState('')
   
  
    return(
    
  <div className=' h-full bg-gray-900  pt-36'>
      {show &&
         <form
         className={` max-w-lg lg:max-w-xl z-10  fixed inset-0 mt-32 h-1/2  lg:h-3/5 mx-auto bg-gray-800 rounded-lg px-4 pt-1 border-black border ${show && '  brightness-100'} `}
         onSubmit={async() => {
          
           await axios.post(`https://light-nvls.herokuapp.com/novels/postreview/${data?.slug}/`, {rating,review})
           mutate({...data})
           setReview('');
           setRating(0);
           setShow(false)
         }} 
       >
         <div className=' -mx-3  mb-6'>
           <div className="flex items-center justify-between">
           <h2 className='px-4 pt-3 pb-2 xl:text-2xl  text-xl font-semibold text-gray-500'>Write a Review</h2>
           <svg onClick={()=>setShow(false)} xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3  text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
           </svg>
           </div>
           <div className='w-full md:w-full px-3 mb-2 mt-2'>
             <div className="flex space-x-4 items-center">
            <h1>Review Score</h1>
             <ReactStars  
             count={5}
             size={30}
             value={rating}
             onChange={ rating =>setRating(rating) }
             />
             </div>
             <textarea
               className='bg-gray-900 rounded border border-gray-400 leading-normal resize-none w-full h-40
                 lg:h-44 py-0 px-2 font-medium placeholder-gray-600 focus:outline-none focus:bg-gray-900'
               name='review'
               placeholder='Type Your Comment'
               value={review}
               onChange={(e) => setReview(e.target.value)}
               required
             ></textarea>
           </div>
           <div className='w-full md:w-full flex items-center px-3'>
             <div className='flex items-start w-1/2 text-gray-300 px-2 mr-auto'>
               <svg
                 fill='none'
                 className='w-5 h-5 text-gray-300 mr-1'
                 viewBox='0 0 24 24'
                 stroke='currentColor'
               >
                 <path
                   stroke-linecap='round'
                   stroke-linejoin='round'
                   stroke-width='2'
                   d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                 />
               </svg>
               <p className='text-xs md:text-sm pt-px'>
                 Leave a kind review to this  WebNovel.
               </p>
             </div>
             <div className='-mr-1'>
               <input
                 type='submit'
                 className='bg-blue-500 p xl:text-xl xl:p-2 rounded-xl xl:w-56 '
                 value='Post Review'
               />
             </div>
           </div>
         </div>
       </form>
}
  <div className={`w-full bg-gray-800 h-full xl:pl-5 pt-2 sm:w-4/5 lg:w-2/3  sm:mx-auto px-3 ${show && 'filter brightness-50'}`}>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-x-0 ">
    </div>
 <div className="flex p-1 border-b-2 pb-2  border-gray-600 items-center  ">
 <img className="h-20 rounded-lg w-14 lg:h-28 lg:w-20" src={data?.cover} alt="" />
 <div className="ml-3 lg:ml-6 ">
 <h1 className="text-indigo-400  sm:text-xl lg:text-2xl text-lg font-semibold">{data?.title}</h1>
 <div className="flex items-center">
 <img className="w-5 h-5 md:w-7 md:h-7 text-gray-400  " src="https://img.icons8.com/ios-glyphs/60/000000/crown.png"/>
 <h1 className="text-sm mx-2 md:text-lg  text-gray-400">Rank {data?.rank}</h1>
 </div>
 <p className="text-sm  md:text-lg text-gray-400"> {formatDistanceToNow(
   new Date(moment.utc(data?.update_at).local().format()),
   {
     addSuffix: true,
    }
    )}</p>
 </div>
 </div>
 <h1 className="font-semibold lg:text-xl my-1 ">List of reviews made by users for {data?.title} (Web Novel) novel.</h1>
 <p className="lg:text-lg ">{data?.reviews.length} users have written reviews for {data?.title} (Web Novel) novel and rated it with an average score
  of {data?.avg} out of 5. Our novel is ranked {''} among all the novels in the Light Novel Pub platform.</p>
<div className="flex flex-col  sm:mr-20  mx-1 pb-2 pt-4">
<div className=" flex justify-between items-center pb-1">
<div>
<h1 className="text-lg lg:text-xl xl:text-3xl text-gray-500 font-semibold -mb-2">{data?.length} Reviews</h1>
{data?.avg &&(
<div className="flex items-center space-x-3">
         <ReactStars
         count={5}
         value={data?.avg}
         isHalf={true}
         edit={false}
         size={25}
         />
         <h1 className="text-lg font-bold text-gray-300 w-12 xl:w-14 xl:text-xl truncate">{data?.avg}</h1>
         </div>
         )}
</div>
<div>
<button onClick={()=>setShow(!show)} className=' cursor-pointer bg-indigo-600 p-0 w-20 sm:w-32 xl:w-64 
 sm:py-3 xl:text-xl rounded-lg text-sm'>
WRITE A REVIEW</button>
</div>
</div>
<p className="w-full xl:text-lg text-sm border-b-2 pb-2 border-gray-600">Please share your thoughts to rate and score...</p>
</div>




{data?.reviews.map(item=>(
  
  
  <div  >
<div className="flex space-x-4 items-center pt-3">
<img className="h-11 w-11 lg:h-16 lg:w-16 rounded-full" src={item?.avatar} alt="" />
<div className=" -space-y-3">
<h1 className=" text-blue-300">{item?.user}</h1>
<ReactStars
size={25}
count={5}
edit={false}
value={item?.rating}
/>
</div>
<p className="text-xs  lg:text-base mr-10"> {formatDistanceToNow(
new Date(moment.utc(item?.date_added).local().format()),
{
 addSuffix: true,
}
)}</p>
</div>
<h1 className="w-full my-1 pb-1  text-xs sm:text-sm lg:text-lg  text-white">{item?.review}</h1>
<div className="flex justify-between mx-2  border-gray-700 border-b-2  pb-3">
 <button className="border-indigo-600 border-2 text-indigo-700 rounded-md p-0 text-xs lg:text-base">View Details</button>
 <div className="flex space-x-2 mr-7 items-center  space-x-4">
     <div className="flex space-x-2 items-center">
 <svg onClick={async()=>{
  
   await axios.put(`https://light-nvls.herokuapp.com/novels/putreview/${item.id}/`)
   mutate({...data})
 }} xmlns="http://www.w3.org/2000/svg" class="h-4 lg:h-5 lg:w-5 w-4 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
 <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
 </svg>
 <p className="text-sm xl:text-base">{item?.like}</p>
     </div>
     <div className="flex space-x-2 items-center">
 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
 </svg>
 <p className="text-sm xl:text-base">{}2</p>
     </div>
 </div>
</div>
</div>
))}
</div>
</div>
    ) 

    
  }


export default Review;      

