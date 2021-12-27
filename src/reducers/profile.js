import {
  GET_PROFILE,
  GET_MEMBERPROFILE,
  PROFILE_ERROR,
  CLEAR_MEMBERPROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_TOKEN,
  NO_TOKEN,
  GET_LIBRARY,
  ADD_TO_LIBRARY,
  GET_HISTORY,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  library: null,
  history: null,
  memberProfile: null,
  accessToken: null,
  loading: true,
  error: {},
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //send the payload to the state
    case GET_PROFILE:
    case UPDATE_PROFILE: // UPDATE_PROFILE has the same action has GET_PROFILE type because we just need to 
        return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_HISTORY:
        return {
        ...state,
        history: payload,
        loading: false,
      };
    case GET_MEMBERPROFILE:
      return {
        ...state,
        memberProfile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case CLEAR_MEMBERPROFILE:
      return {
        ...state,
        memberProfile: null,
        loading: false,
      };
    case GET_TOKEN:
      console.log('TOKEN');
      return {
        ...state,
        accessToken: payload,
        loading: false,
      };
    case NO_TOKEN:
      return {
        ...state,
        accessToken: null,
      };
    case GET_LIBRARY:
      return {
        ...state,
        library: payload,
        loading: false
      };
    case ADD_TO_LIBRARY:
      return {
        ...state,
        library: {...state.library, library:payload},
        loading: false
      };
    default:
      return state;
  }
}
