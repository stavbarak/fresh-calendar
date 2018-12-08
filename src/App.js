import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TaskView from './components/TaskView';
import DayView from './components/DayView';

class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <Switch>
              <Route path="/tasks/:id" component={ TaskView } />
              <Route path="/:date" component={ DayView } />
              <Route path="/" component={ Calendar } />
            </Switch>
        </BrowserRouter> 
    );
  }
}

export default App;
