import { SET_FONT, SET_NOTIFICATIOS, SET_SETTIGNS, SET_SIZE } from "../actions/types";


const initialState = {
    notifications: [],
    fontSize: '3xl',
    fontType: '',
}
export default function foo (state =initialState, action) {
    const { payload } = action;

    switch (action.type) {
        case SET_NOTIFICATIOS:
            const item =  payload

                return {
                    ...state,
                    notifications: [...state.notifications, item]
                }
      
        case SET_SIZE:
            return {
                ...state,
                fontSize: payload
            }
        case SET_FONT:
            return {
                ...state,
                fontType: payload
                }

        default:
            return state;
    }

}