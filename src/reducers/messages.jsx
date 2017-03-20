import 'babel-polyfill';
import { ActionTypes } from '../constants';


const messages = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_MESSAGE:
            return [
                ...state,
                action.message
            ];
        case ActionTypes.CLEAR_CHAT:
        case ActionTypes.FLUSH:
            return [];
        default:
            return state;
    }
};
export default messages;
