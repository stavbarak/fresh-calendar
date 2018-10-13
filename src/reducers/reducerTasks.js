import _ from 'lodash';
import {
    TASK_DELETED, TASK_UPDATED,
    TASKS_FETCHED, TASK_CREATED, TASK_FETCHED } from '../actions/types';

const initialState = {
  displayedTask: {}
}

export default function (state= initialState , action) {
    switch (action.type){
        case TASK_FETCHED:
            return {
              ...state,
              displayedTask: action.taskItem
            }
        case TASK_DELETED:
            return {
                ...state,
                tasks: _.omit(state.tasks, action.payload)
            }
        case TASKS_FETCHED:
            return {
              ...state,
              tasks: action.tasks
            }
        case TASK_UPDATED:
            return { 
                ...state, 
                tasks: Object.assign({}, state.tasks, { id: action.values }) 
            }
        case TASK_CREATED:
            return { ...state, tasks: [...action.tasks] }
        default:
            return state;
    }
}
