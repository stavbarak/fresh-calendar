import {
    OPEN_MODAL,
    CLOSE_MODAL,
    SELECT_DATE,
    CHANGE_MONTH,
    RESIZE_WINDOW
} from './types';


export function openModal() {
    return {
        type: OPEN_MODAL
    }
}

export function closeModal() {
    console.log('closeModal action')
    return {
        type: CLOSE_MODAL
    }
}

export function selectDate(day) {
    return {
        type: SELECT_DATE,
        day
    }
}

export function changeMonth(month) {
    return {
        type: CHANGE_MONTH,
        month
    }
}

export function resizeWindow(width) {  
    return {
        type: RESIZE_WINDOW,
        width
    }
}