import { ActionTypes } from '../constants';

export const toggle = () => ({
    type: ActionTypes.TOGGLE
})

export const login = (fields, data) => ({
    type: ActionTypes.LOGIN,
    fields: fields,
    data: data
})

export const logout = () => ({
    type: ActionTypes.LOGOUT
})