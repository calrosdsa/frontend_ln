import React,{useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import { formatDistanceToNow } from 'date-fns';
import moment from 'moment';
import { Fragment } from 'react';

const CommentItem = ({
  postId,
  comment,
  mutate,
  data,
  auth,
  setShow,
  show,
  deleteComment,
}) => {

  const [open,setOpen]= useState(false)
  

  const [reply, setReply] = useState(''); 


 // useEffect(() => {
   // if (!showActions) return;
 //   if (!comment) return;
   // if (comment.count_likes.includes(auth.user)) {
     // setLiked(true);
    //} else {
     // setLiked(false);
   // }
  //}, [comment]);

  return (
    <Fragment>
             {show &&
      <div
      className={` max-w-lg lg:max-w-xl  fixed inset-x-0 mt-32  mx-auto bg-gray-800 rounded-lg px-4 pt-1 
       ${show && 'filter  brightness-100'} `}
      
      >
      <div className='flex  justify-between items-center'>
      <h1 className=' text-xl text-gray-400 border-b-2 border-gray-400 my-1 py-1'>Reply Comment</h1>
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
            await axios.post(`/novels/comment/${data?.id}/`, {reply})
            mutate({...data})
            setOpen(false)
          }}
         >Post Comment</button>
       </div>
      </div>
      }   




      <div class=' overflow-hidden bg-gray-800 shadow-lg h-auto w-full sm:w-5/6 mx-auto  border-gray-700 border-2  sm:rounded-lg p-1'>
            <div className='flex space-x-5 items-center w-full justify-between'>
              <div className='flex space-x-4'>
          <img class='rounded-full h-16 w-16' src={comment.image} />
          <div>
            <h2 class='text-xl lg:text-2xl '>{comment.added_b}</h2> 
            <h2 className='bg-gray-600 rounded-xl px-1'>Reader</h2>
          </div>
              </div>
              {auth.user.username === comment.added_b &&
          <Link className='pr-5 bg-indigo-600 p rounded-lg' to={`/comment/${comment.id}`}>View Details</Link>
              }
              
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
          onClick={() => deleteComment(postId,comment.id)}
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
           <button onClick={()=>setShow(true)} className="text-lg mr-3">Reply?</button>
    </div>
</div>


      </div>
    </Fragment>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);

{
  /* <div className='comment bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${added_by}`}>
          <img className='round-img' src={avatar_url} alt='Avatar' />
          <h4>{added_by}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{body}</p>
        <p className='comment-date'>
          Posted{' '}
          {formatDistanceToNow(
            new Date(moment.utc(date_added).local().format()),
            {
              addSuffix: true,
            }
          )}
        </p>

        {!auth.loading && added_by === auth.user.username && (
          <button
            onClick={() => deleteComment(postId, id)}
            type='button'
            className='btn btn-danger'
          >
            DELETE
          </button>
        )}
      </div>
    </div> */
}
