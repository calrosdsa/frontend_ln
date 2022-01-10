import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_POST,
  
  POST_ERROR,
  REMOVE_COMMENT,
  
  TAG_SLUG,
  
  GET_RANKED,
  GET_FILTER,
  GET_REVIEWS
} from './types';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Get Many Posts method

export const getFilter = (query) => async (dispatch) => {
  // if (localStorage.token) {
  //   setAuthToken(localSorage.token); // This needs to be included in GET requests or django will reject it!!!
  // }
  try {
    const res = await axios.get(`https://light-nvls.herokuapp.com/novels/filter/${query}`);

    dispatch({
      type: GET_FILTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getFilterTag = (query) => async (dispatch) => {
  // if (localStorage.token) {
  //   setAuthToken(localSorage.token); // This needs to be included in GET requests or django will reject it!!!
  // }
  try {
    const res = await axios.get(`https://light-nvls.herokuapp.com/novels/tag/${query}`);

    dispatch({
      type: GET_FILTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getRanked = () => async (dispatch) => {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token); // This needs to be included in GET requests or django will reject it!!!
  // 

  try {
    const res = await axios.get('/novels/ranking/');

    dispatch({
      type: GET_RANKED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Add Like

// Add Post - whenever there is an action that needs to put in the payload, data should be passed in the func argument

export const addPost = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post('/novels/', formData);
    // in a post request to the backend, the data is inputed in the second argument of the axios.post method

    dispatch({
      type: ADD_POST,
      payload: res.data.post,
    });

    dispatch(setAlert('Post Created', 'success'));
    history.push('/posts');
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getReviews = (slug) => async (dispatch) => {
  try {
    const res = await axios.get(`/novels/postreview/${slug}/`);
    
    dispatch({
      type: GET_REVIEWS,
      payload: res.data.post,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const getTag = (slug) => async (dispatch) => {
  try{
    const res = await axios.get(`/novels/tag/${slug}/`);
    dispatch({
      type : TAG_SLUG,
      payload: res.data,
    })
  }catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
}
}
// Add Comment to a Post



//Deleting a Comment

export const deleteComment = (postId, id) => async (dispatch) => {
  try {
    await axios.delete(`/novels/comment/${postId}/${id}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: id,
    });

    dispatch(setAlert('Comment Successfully Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
