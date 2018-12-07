import _ from 'lodash';
import {
    TASK_DELETED, TASK_UPDATED,
    TASKS_FETCHED, TASK_CREATED, 
    TASK_FETCHED, TASKS_BY_DATE_FETCHED,
    GET_TASKS_BY_DATE
 } from '../actions/types';

const initialState = {
  displayedTask: {},
  tasksByDate: {}
}

export default function (state= initialState , action) {
    switch (action.type){
        case TASK_FETCHED:

            return {
              ...state,
              displayedTask: action.task
            }
        case GET_TASKS_BY_DATE:
            const {tasks} = state;
            let tasksByDate = {};
            for(let taskId in tasks) {
                let task = tasks[ taskId ];
                task.id = taskId;
                if (tasksByDate[ task.date ] instanceof Array) {
                    tasksByDate[ task.date ].push(task);
                    tasksByDate[ task.date ].sort(function(a, b){
                    if (a.startTime > b.startTime) {
                        return 1;
                    }
                    return -1;
                    })
        
                } else {
                    tasksByDate[ task.date ] = [ task ];
                }
            }
            return {
                ...state, tasksByDate

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
            return { ...state, tasks: Object.assign({}, state.tasks, {id: action.task.id})}
        case TASKS_BY_DATE_FETCHED:
            return {
                ...state,
                todaysTasks: state.tasksByDate[action.date]
            }    
        default:
            return state;
    }
}
