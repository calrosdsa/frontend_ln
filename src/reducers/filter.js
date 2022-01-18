import { GET_FILTER } from "../actions/types";

  const initialState = {
    pages_count: null,
    products_count: null,
    ordering: null,
    current: null,
    next: null,
    previous: null,
    status_: null,
    category_: null,
    novels: [],
    tag: [], 
    tags:[],
    title: null,
  };
  
  export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case GET_FILTER:
        return { ...state, ...payload };
      default:
        return state;
    }
  };
  