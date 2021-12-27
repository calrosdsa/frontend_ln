import { SET_NOTIFICATIOS } from "../actions/types";


const initialState = {
    notifications: []
}
export default function foo (state =initialState, action) {
    const { type, payload } = action;

    switch (action.type) {
        case SET_NOTIFICATIOS:
            const item =  payload
            const existItem = state.notifications.find(x => x.product === item.product)

                return {
                    ...state,
                    notifications: [...state.notifications, item]
                }

        default:
            return state;
    }

}