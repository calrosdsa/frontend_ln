import { SET_NOTIFICATIOS } from "./types";
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


export const setWebsockets = (notifications)=>async(dispatch, getState)=>{
    if (localStorage.token){
        setAuthToken(localStorage.token);
      }
    dispatch({
        type : SET_NOTIFICATIOS,
        payload:{
            notifications:notifications,
            name:'hello',
            image:'https://m.media-amazon.com/images/I/41WUb2JBGqL.jpg'
        }
    })
    localStorage.setItem('notifications', JSON.stringify(getState().websockets.notifications))
}