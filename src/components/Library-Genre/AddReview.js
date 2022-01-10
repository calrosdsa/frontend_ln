import PropTypes from 'prop-types'
import { addReview } from '../../actions/comment'
import { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import { mutate,trigger } from 'swr'
import { fetcher } from '../novel/Review'
const AddReview=({addReview,data,postId,setShow})=>{
    const [rating,setRating] = useState()
    const [review,setReview] = useState('')



    return(
        <div className=''>
        <div
     className=' max-w-md  mx-auto bg-gray-800 rounded-lg px-4 pt-1 border-black border '
    
   >
     <div className='flex flex-wrap -mx-3  mb-6'>
       <div className="flex items-center  ">
       <h2 className='px-4 pt-3 pb-2 xl:text-2xl  text-xl font-semibold text-gray-500'>Write a Review</h2>
       <svg onClick={()=>setShow(false)} xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 ml-44 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
           className='bg-gray-900 rounded border border-gray-400 leading-normal resize-none w-full h-20 sm:h-28 py-0 px-2 font-medium placeholder-gray-600 focus:outline-none focus:bg-gray-900'
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
             Leave a kind comment to this post.
           </p>
         </div>
         <div className='-mr-1'>
           <buttom
             className='bg-blue-500 p xl:text-xl xl:p-2 rounded-xl xl:w-56 '
             onClick={async(e) => {
              e.preventDefault();
              await axios.post(`/novels/postreview/${postId}/`, {rating,review})
              mutate({...data})
              setReview('');
              setRating(0);
              setShow(false)
            }}
            
           >Post Review</buttom>
         </div>
       </div>
     </div>
   </div>
       </div>
    )
}
AddReview.propTypes={
    addReview: PropTypes.func.isRequired
};
export default connect(null, {addReview})(AddReview)