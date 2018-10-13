import _ from 'lodash';
import React from 'react';
import TaskIndication from './TaskIndication';

const DailyTasks = ({ day, todaysTasks }) => {
    return _.map(todaysTasks, item => {
        return (
            <TaskIndication day={day} task={item} key={item.id}/>
        );           
    });
}

export default DailyTasks;