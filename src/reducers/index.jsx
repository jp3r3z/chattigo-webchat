import 'babel-polyfill';
import { combineReducers } from 'redux';
import { ActionTypes } from '../constants';
import { v4 } from 'node-uuid';

const visibility = (state = 'COLLAPSED', action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE:
            if (state == 'COLLAPSED')
                return 'EXPANDED';
            else
                return 'COLLAPSED';
        default:
          return state;
    }
};

const session = ( state = { is_loggedin: false }, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            let session = { is_loggedin: true };
            if (state && state.user) {
                session.user = state.user;
            } else {
                session.user = v4();
            }
            return Object.assign({}, state, session, { fields: action.fields }, action.data);
        case ActionTypes.LOGOUT:
            return Object.assign({}, state, { is_loggedin: false });
        default:
          return state;
    }
};

const ChattigoReducer = combineReducers({
  visibility,
  session
});

export default ChattigoReducer;