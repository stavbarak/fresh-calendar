import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchTask, deleteTask } from '../actions/TasksActions';
import { closeModal } from '../actions/GeneralActions';
import TaskForm from './TaskForm';

class TaskView extends Component {

    componentDidMount() {   
      const {id} = this.props.match.params;
      this.props.fetchTask(id);
      this.props.closeModal();      
    }

    onDelete = () => {
        const {id} = this.props.match.params;
        this.props.deleteTask(id);
        this.getBack();
    }

    getBack = () => {
        if (this.props.history.location.pathname.indexOf('/tasks') !== -1){
            this.props.history.goBack();
        } 
        this.props.closeModal();
    }

    render () {        
        const { task } = this.props;       
        const {id} = this.props.match.params;

        if (!task) {
            return <div>Loading...</div>;
        }

        return (
            <div className="taskView">
                <div className="taskViewTop">
                    <Button className="btn btn-danger taskViewElement" onClick={this.onDelete}>
                        <span>Delete Task</span>
                        <span className="smallIcon formWrapper">
                            <FontAwesomeIcon icon="trash" />
                        </span>
                    </Button>
                </div>
                <TaskForm taskId={id} history={this.props.history} getBack={this.getBack} />
            </div>

        );
    }
}

const mapStateToProps = (state) => {
  return {
    task: state.tasks.displayedTask
  }
}


export default connect(mapStateToProps, {
    fetchTask, 
    deleteTask,
    closeModal
})(TaskView);
