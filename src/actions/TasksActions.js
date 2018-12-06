import {
    fetchTasksFromServer,
    fetchTaskFromServer,
    updateTaskInServer,
    createTaskInFirebase,
    deleteTaskInFirebase
  } from '../logic/firebase-logic.js'

import {
  change
} from 'redux-form'

import {
    TASKS_FETCHED,
    TASK_CREATED,
    TASK_FETCHED,
    TASK_DELETED,
    TASK_UPDATED,
    GET_TASKS_BY_DATE,
    FETCH_TASKS_BY_DATE,
    TASKS_BY_DATE_FETCHED
} from './types';

const form = "taskForm";

  export function taskFetched(taskItem) {
    return {
      type: TASK_FETCHED,
      taskItem
    }
  }

  function tasksFetched(tasks) {
    return {
      type: TASKS_FETCHED,
      tasks
    }
  }

  function taskUpdated(id, values) {
    return {
      type: TASK_UPDATED,
      id,
      values
    }
  }

  function getTasksByDate(tasks){
    return {
      type: GET_TASKS_BY_DATE,
      tasks
    }
  }

  export function taskByDateFetched(date){
    console.log('taskByDateFetched action', date)
    return {
      type: TASKS_BY_DATE_FETCHED,
      date
    }
  }

   export function fetchTasksByDate(date) {
     console.log(date)
     return function (dispatch) {
      dispatch(taskByDateFetched(date))
     }
    // return function (dispatch) {
    //   fetchTasksFromServer()
    //   // .then((tasks) => {
    //   //   console.log('tasks', tasks)
    //   //   dispatch(tasksFetched(tasks))
    //   //  //dispatch(taskByDateFetched(date))
    //   // })
    //   .then((date) => {
    //     console.log('date', date)
    //     dispatch(taskByDateFetched(date))
    //   })
    // }
  }

export function updateTask(id, values) {
  return function(dispatch) {
    updateTaskInServer(id, values)
      .then(dispatch(taskUpdated(id, values)))
      .then(dispatch(fetchTasks()))
  }
}

  export function deleteTask(id) {
    return function (dispatch) {
      deleteTaskInFirebase(id)
        .then(dispatch(taskDeleted(id)));
    }
  }

  export function setDefaults(task) {
    return function (dispatch) {
        dispatch(change(form, "date", task.date))
        dispatch(change(form, "eventText", task.eventText))
        dispatch(change(form, "startTime", task.startTime))
        dispatch(change(form, "endTime", task.endTime))
    }
  }

  export function fetchTask(id) {
    return function (dispatch) {
      fetchTaskFromServer(id).then((task) => {
        dispatch(taskFetched(task))
        dispatch(change(form, "day", task.dayFormatted))
        dispatch(change(form, "date", task.date))
        dispatch(change(form, "eventText", task.eventText))
        dispatch(change(form, "startTime", task.startTime))
        dispatch(change(form, "endTime", task.endTime))
      })
    }
  }

  export function fetchTasks() {
    console.log('fetch tasks action')
    return function (dispatch) {
      fetchTasksFromServer().then((tasks) => {
        dispatch(tasksFetched(tasks))
      })
      .then((tasks) => {
        dispatch(getTasksByDate(tasks))
      })
    }
  }

  // export function taskCreated(tasks) {
  //     console.log('taskCreated');
  //     return {
  //         type: TASK_CREATED,
  //         tasks
  //     }
  // }

  export function taskDeleted(id){
      return {
          type: TASK_DELETED,
          payload: id
      }
  }

  export function createTask({task}) {
    console.log('createTask')
    console.log(task)
    return function (dispatch) {
      createTaskInFirebase(task)
        .then(dispatch(fetchTasks()));
    }
  }


  // export function getTasksByDate(tasks) {
  //   let tasksByDate = {};
  //   for(let taskId in tasks) {
  //     let task = tasks[ taskId ];
  //     task.id = taskId;
  //     console.log(task.date)
  //     if (tasksByDate[ task.date ] instanceof Array) {
  //       tasksByDate[ task.date ].push(task);
  //       tasksByDate[ task.date ].sort(function(a, b){
  //         if (a.startTime > b.startTime) {
  //           return 1;
  //         }
  //         return -1;
  //       })

  //     } else {
  //       tasksByDate[ task.date ] = [ task ];
  //     }
  //   }
  //   return tasksByDate;
  // }