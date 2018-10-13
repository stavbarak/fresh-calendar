import {
    OPEN_MODAL, CLOSE_MODAL, CHANGE_MONTH,
    SELECT_DATE, RESIZE_WINDOW
    } from '../actions/types';

const initialState = {
    currentDay: new Date(),
    currentMonth: new Date(),
    selectedDate: new Date(),
    showModal: false,
    windowWidth: window.innerWidth,
}

export default function (state = initialState, action) {
    switch (action.type){
        case OPEN_MODAL:
            return { ...state, showModal: true }
        case CLOSE_MODAL:
            return { ...state, showModal: false }
        case CHANGE_MONTH:
            return { ...state, currentMonth: action.month }
        case SELECT_DATE:
            return { ...state, selectedDate: action.day }
        case RESIZE_WINDOW:
            return {...state, windowWidth: action.width}      
        default:
            return state;
    }
}
