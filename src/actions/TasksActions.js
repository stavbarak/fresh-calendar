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
    FETCH_TASKS_BY_DATE
} from './types';

const form = "taskForm";

  export function fetchTasksByDate(date){
    return {
      type: FETCH_TASKS_BY_DATE,
      date
    }
  }

  export function taskFetched(taskItem) {
    return {
      type: TASK_FETCHED,
      taskItem
    }
  }

  function tasksFetched(tasks) {
    //console.log('tasksFetched action')
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
