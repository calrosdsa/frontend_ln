import React, { Fragment, useEffect } from 'react';
import Footer from '../layout/Footer';
import { formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import ReactStars from "react-rating-stars-component";
import ReactLoading from 'react-loading';
import Banner from './Banner';
import { Link } from 'react-router-dom';
import NovelItem from './NovelItem';
import useSWR from 'swr';
import { fetcher } from '../novel/Review';
const Posts = ({ }) => {


  function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
}

  const {data , isLoading}  = useSWR(`https://light-nvls.herokuapp.com/novels/ranking/`, fetcher )
   if(isLoading) return <ReactLoading/>

  
  return  (
    <Fragment>
        {!data? (
              <div className='w-full h-screen  bg-gray-800 flex  justify-center sm:pt-56 '>
              <ReactLoading type='bars' color='#fff' width={300} />
            </div>
            ):(

    <div className="bg-gray-900 relative pt-2">
       <div className="w-full  z-20 px-2 sm:w-11/12 md:w-3/4 mt-5 sm:px-10 justify-center sm:mx-auto">
<Banner/>

      
         <div className='flex  justify-between   border-b my-2 border-gray-500 mx-auto '>
      <h1 className='text-gray-400 font-bold pb-2 lg:pb-4  text-xl'>New  Ongoing Release</h1>
      <Link as="fetch" crossorigin="anonymous" rel='preload' to ='/genre/?ordering=-created'
       className='text-md font-medium text-indigo-400'>View More</Link>
      </div>
      <div className='grid grid-cols-3 sm:grid-cols-4 gap-x-2  lg:grid-cols-5   xl:grid-cols-6  rounded-xl 
       pb-10 pl-1 place-items-center '>
         
        {data?.posts.map((post) => (
          <NovelItem key={post.id} post={post}/>
          ))}
            </div>
      <div className='lg:grid lg:grid-cols-3 flex flex-col lg:-mx-20  bg-gray-800 
       md:gap-2 gap-1  my-10 
       rounded-xl  pb-10 pl-1 place-items-center '>


      <div className="bg-gray-800 relative pt-2">
     <h1 className='bg-blue-600 text-white font-bold text-lg rounded-lg p-1 my-2  w-48'>Most Read</h1>
       <div className='grid grid-cols-2  w-full lg:flex lg:flex-col gap-x-1 sm:gap-x-6  lg:gap-x-0'>
     {data?.popular.map((item)=>(
       <Link  to={`/novel/${item.slug}`}>

         <div key={item.id} className='grid grid-cols-4 my'>
           <div className='pr-1 col-start-1 place-self-end'>
             <img className='w-11 h-16 sm:w-12 rounded-lg' src={item.cover} alt="" />
         </div>
         <div className='col-start-2 col-span-3'>
       <h1 className='text-xs sm:text-sm line-clamp-1  text-gray-400   font-bold '>
         {item.title}
       </h1>
       <div className='flex items-center space-x-2'>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
       </svg>
       <h1 className='text-gray-400 text-xs sm:text-sm'>{numFormatter(item.novel_views)} (Monthly)</h1>
       </div>
       <div className='flex items-center space-x-2 text-gray-400 text-xs sm:text-sm my'>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
       </svg>
       <h1>{item.chapter_count}</h1>
       </div>
         </div>
     </div>
             </Link>
     ))}
             </div>
     
    </div>


    <div className="bg-gray-800 relative pt-2">
        <h1 className='bg-blue-600 text-white font-bold text-lg rounded-lg p-1 my-2  w-48'>Trends</h1>
       <div className='grid grid-cols-2 lg:flex lg:flex-col gap-x-2 sm:gap-x-6  lg:gap-x-0'>
     {data?.trends.map((item)=>(
       <Link to={`/novel/${item.slug}`}>


         <div key={item.id} className='grid grid-cols-4 my'>
         <div className='pr-1 col-start-1 place-self-end'>
             <img className='w-11 h-16 sm:w-12 rounded-lg' src={item.cover} alt="" />
         </div>
         <div className='col-start-2 col-span-3 mt-2 sm:mt-1'>
       <h1 className='text-xs sm:text-sm line-clamp-1  text-gray-400   font-bold '>
         {item.title}
       </h1>
       <div className='flex items-center space-x-2 text-sm text-gray-400'>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
        </svg>
         <h1 className='text-xs sm:text-sm'>{item.commentss} Comments</h1>
       </div>
       <div className='flex items-center space-x-2 text-xs sm:text-sm text-gray-400'>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
       <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
         <h1>{item.reviews} Reviews</h1>
         </div>
         </div>
     </div>
     </Link>
     ))}
             </div>
    </div>



    <div className="bg-gray-800 relative pt-2 ">
       <h1 className='bg-blue-600 text-white font-bold text-lg rounded-lg p-1 my-2  w-48'>User Rated</h1>
       <div className='grid grid-cols-2 lg:flex lg:flex-col gap-x-2 sm:gap-x-6  lg:gap-x-0'>
     {data?.rated.map((item)=>(
       <Link to={`/novel/${item.slug}`}>

         <div key={item.id} className='grid grid-cols-4 my'>
         <div className=' pr-1 col-start-1 place-self-end'>
             <img className='w-11 h-16 sm:w-12  rounded-lg' src={item.cover} alt="" />
         </div>
         <div className='col-start-2 col-span-3'>
       <h1 className='text-xs sm:text-sm  truncate text-gray-400   font-bold '>
         {item.title}
       </h1>
       <div className='flex items-center space-x-2 -my-1'>
       <ReactStars
            value={item.average}
            count={5}
            isHalf={true}
            edit={false}
            size={20}
            />
       <h1 className='text-gray-300 text-xs sm:text-sm '>{item.average}</h1>
            </div>
            <div className='flex space-x-2 text-xs sm:text-sm items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
       <h1 className=' text-gray-400'>{item.reviews} Reviews</h1>
            </div>
         </div>
     </div>
     </Link>
     ))}
             </div>
    </div>
    

    
    </div>
      
    
    <div className='flex  justify-between  border-b my-2 border-gray-500 mx-auto '>
      <h1 className='text-gray-400  font-bold pb-2 lg:pb-4  text-xl'>Weekly Most Actived</h1>
      </div>
      
      <div className='grid grid-cols-3 sm:grid-cols-4  lg:grid-cols-6   2xl:grid-cols-6  
       md:gap-2 gap-1   
       rounded-xl pb-10 pl-1 place-items-center  '>
         
        {data?.weekly.map((post) => (
          <NovelItem key={post.id} post={post}/>
          ))}
      </div>
      
      <div className='flex  justify-between  border-b my-2 border-gray-500 mx-auto '>
      <h1 className='text-gray-400  font-bold pb-2 lg:pb-4  text-xl'>Completed Stories</h1>
          <Link to='/genre/?status=2' className=' cursor-pointer text-md font-medium text-indigo-400'>View More</Link>
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-4  lg:grid-cols-6   2xl:grid-cols-6  
       md:gap-2 gap-1   
       rounded-xl pb-10 pl-1 place-items-center  '>
         
        {data?.completed.map((post) => (
            <NovelItem key={post.id} post={post}/>
            ))}
      </div>
      <div className='flex justify-between  border-b my-2 border-gray-500 mx-auto '>
      <h1 className='text-gray-400  font-bold pb-2 lg:pb-4  text-xl'>Recently Added Chapters</h1>
      <Link to ='/updates' className='text-md font-medium text-indigo-400'>View More</Link>
      </div>
      <div className='grid grid-cols-2  lg:grid-cols-3 lg:grid-rows-8  flex-col lg:-mx-20  bg-gray-800 
       md:gap-2 gap-1  my-10 
       rounded-xl  pb-10 pl-1 p-1 '>

           {data?.chapters.map(item=>(
              <div key={item.id } className='grid grid-cols-4 my '>
                <div className=' col-start-1 place-self-end'>
                  <img className='w-10 h-14 sm:w-12 sm:h-16   rounded-lg' src={item.novel_cover} alt="" />
                </div>
              <div className='ml-2 col-start-2 col-span-3'>
                <Link to={`/novel/${encodeURIComponent(item.novel_slug)}`} >
            <h1 className='text-xs sm:text-sm line-clamp-1 text-gray-400   font-bold '>
              {item.novel_title}
            </h1>
                </Link>
                <Link to={`/chapter/${encodeURIComponent(item.slug)}`} >
            <h1 className='text-xs sm:text-sm line-clamp-1  text-indigo-400   '>
              {item.title}
            </h1>
                </Link>
            <div className='flex  items-center text-xs text-gray-500 '>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span className=' line-clamp-1' >  {formatDistanceToNow(
              new Date(moment.utc(item.created_at).local().format()),
              {
                addSuffix: true,
                    }
                    )}</span>
            </div>
              </div>
          </div>
           ))}

      </div>
      

            </div>
            <Footer/>
    </div>
    )}
    </Fragment>
  );
};

export default Posts;
