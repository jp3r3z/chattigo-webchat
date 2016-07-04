import 'babel-polyfill';
import { ActionTypes } from '../constants';
import { v4 } from 'node-uuid';

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
export default session;