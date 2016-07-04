import 'babel-polyfill';
import { ActionTypes } from '../constants';


const messages = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_MESSAGE:
            return [
                ...state,
                action.message,
            ];
        default:
            return state;
    }
};
export default messages;