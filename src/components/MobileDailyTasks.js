import _ from 'lodash';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import TaskIndication from './TaskIndication';

class MobileDailyTasks extends Component {
    renderTasksList(todayFormattedForDisplay, todaysTasks) {
        return _.map(todaysTasks, item => {
            return (
                <li key={item.id} className="list-group-item">
                    <TaskIndication day={todayFormattedForDisplay} task={item} />
                </li>
            )        
        });
    }   

    render() {
        const { onClickNewTask, tasksByDate, todayFormatted, todayFormattedForDisplay } = this.props;
        return (    
            <div>
                <ul className="mobileDailyTasks">
                    <Button onClick={onClickNewTask} className="btn btn-success create"> New Task </Button>
                   {tasksByDate && tasksByDate[todayFormatted] 
                    ? this.renderTasksList(todayFormattedForDisplay, tasksByDate[todayFormatted]) 
                    : ""}
                </ul>
            </div>
        ) 
    }
}


export default MobileDailyTasks;