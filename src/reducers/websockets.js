import { SET_NOTIFICATIOS } from "../actions/types";


const initialState = {
    notifications: []
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

        default:
            return state;
    }

}