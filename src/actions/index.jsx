import { ActionTypes } from '../constants';

export const toggle = () => ({
    type: ActionTypes.TOGGLE
})

export const collapse = () => ({
    type: ActionTypes.COLLAPSE
})

export const expand = () => ({
    type: ActionTypes.EXPAND
})

export const login = (fields, data) => ({
    type: ActionTypes.LOGIN,
    fields: fields,
    data: data
})

export const logout = () => ({
    type: ActionTypes.LOGOUT
})

export const add_message = (message) => ({
    type: ActionTypes.ADD_MESSAGE,
    message: message
})

export const clear_chat = () => ({
    type: ActionTypes.CLEAR_CHAT
})
