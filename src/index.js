import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import './index.css';
import App from './App';
import TaskView from './components/TaskView';
import DayView from './components/DayView';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
library.add({ faEdit, faTrash });

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Switch>                
                <Route path="/tasks/:id" component={ TaskView } />
                <Route path="/:date" component={ DayView } />
                <Route path="/" component={ App } />
            </Switch>
        </BrowserRouter>  
    </Provider> , document.getElementById('root')
);
