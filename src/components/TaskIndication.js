import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import { deleteTask } from '../actions/TasksActions';

class TaskIndication extends Component {

    onDelete(task) {
       this.props.deleteTask(task.id);
    }

    render(){
        const { task } = this.props;
        return (
            <div className="singleTaskIndication" >  
                 <Link to={`tasks/${task.id}`} className="taskLink">
                    <span className="taskTime">{`${task.startTime}-${task.endTime}`}</span>
                    <span className="taskTitle">{task.eventText}</span>
                    <MediaQuery query="(max-width: 667px)">
                        <span className="smallIcon">
                            <FontAwesomeIcon icon="edit" />
                        </span>
                    </MediaQuery>
                 </Link>
                 <MediaQuery query="(max-width: 667px)">
                    <span className="smallIcon trash" onClick={() => this.onDelete(task)} >
                        <FontAwesomeIcon icon="trash" />
                    </span>
                </MediaQuery>
            </div>
        );
    }
}


export default connect(null, {
    deleteTask
  }) (TaskIndication);