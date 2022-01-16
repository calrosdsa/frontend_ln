import { SET_FONT, SET_NOTIFICATIOS, SET_SETTIGNS, SET_SIZE } from "./types";
import axios from 'axios';
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
export const setSize  = (fontSize) =>async(dispatch,getState)=>{
    dispatch({
        type: SET_SIZE,
        payload:{
            fontSize:fontSize,
        }
    })
    localStorage.setItem('fontSize', fontSize)
    

  }

  export const setFont  = (fontType) =>async(dispatch,getState)=>{
    dispatch({
        type: SET_FONT,
        payload:{
            fontType:fontType,
        }
    })
    localStorage.setItem('fontType', fontType)

  }
  