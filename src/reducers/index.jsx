import { combineReducers } from 'redux';
import { ActionTypes } from '../constants';
import messages   from './messages';
import session    from './session';
import visibility from './visibility';

const ChattigoReducer = combineReducers({
    messages,
    visibility,
    session
});

export default ChattigoReducer;