import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import TasksReducer from './reducerTasks';
import GeneralReducer from './reducerGeneral';

const rootReducer = combineReducers({
  general: GeneralReducer,
  tasks: TasksReducer,
  form: formReducer
});

export default rootReducer;