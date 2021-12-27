import {
  ADD_COMMENT,
  ADD_POST,
  CLEAR_POST,
  DELETE_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
  UPDATE_LIKE_COMMENT,
  REPLY_COMMENT,
  TAG_SLUG,
  ADD_REVIEW,
  GET_CHAPTERS,
  GET_REVIEWS,
  GET_POST,
  GET_RANKED,
 
} from '../actions/types';

const initialState = {
  pages_count: null,
  products_count: null,
  current: null,
  next: null,
  previous: null,
  posts: [],
  post: null,
  novel: null,
  reviews: [],
  chapters: [],
  weekly : [], 
  trends: [],
  popular : [],
  rated: [],
  completed:[],
  loading: true,
  error: {},
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
   
      case GET_RANKED:  
      return {
        ...state,
        ... payload,
      };
      case GET_CHAPTERS:
        return{
          ...state,
          ... payload,
        }
      case TAG_SLUG:
      return {
          ...state,
          posts: payload,
          loading: false,
        };
      case GET_REVIEWS:
      return {
        ...state,
        post : payload,
        loading: false
        };

      case GET_POST:
        return{
          ...state,
          novel : payload,
          loading : false,
        }
     
        case ADD_POST:
          return {
            ...state,
            posts: [payload, ...state.posts],
            loading: false,
          };
          case DELETE_POSTS:
            return {
              ...state,
        posts: state.posts.filter((post) => post.id !== payload), // FILTER method: returns ALL posts that have ID that are NOT equal to payload ID
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
      case CLEAR_POST:
        return {
        ...state,
        post: null,
        loading: false,
      };
      case UPDATE_LIKES:
        return {
          ...state,
          post:{...state.post.id===payload.id?{...state.post, likes:payload.likes}:null}, // we're mapping through every post and if that post has the 
          //same id as the payload, then update the likes count of that post. Otherwise, return post
          loading: false,
        };
      
        case UPDATE_LIKE_COMMENT:
          return{
            ...state,
        novel: 
        {
          ...state.novel,
          comments:
          state.novel.comments.map((comment) =>
          comment.id === payload.id ? { ...comment, likes: payload.likes } : comment
          ),
        },
        loading: false,
      }

      case ADD_COMMENT:
      return {
        ...state,
        novel: { ...state.novel, comments: payload },
        loading: false,
      };
      case ADD_REVIEW:
      return{
        ...state,
        novel:{ ...state.reviews, review: payload },
        loading: false
      }
      case REPLY_COMMENT:
      return{
        ...state,
        post:
          {...state.post,
            reply_comments: payload
            },
          loading:false
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment.id !== payload
          ),
        },
      };
    default:
      return state;
  }
}
