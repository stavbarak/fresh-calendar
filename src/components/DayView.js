import React, { Component } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TaskModal from './TaskModal';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchTasks, deleteTask, fetchTasksByDate } from '../actions/TasksActions';
import { closeModal , openModal} from '../actions/GeneralActions';
import DailyTasks from './DailyTasks';

class DayView extends Component {
    componentDidMount() {   
        console.log('day view mount')  
        const {date} = this.props.match.params;
        this.props.fetchTasks();
        this.props.fetchTasksByDate(date);
        //this.props.getTasksByDate();
      }

    render() {
        const {date} = this.props.match.params;
        const { todaysTasks, tasksByDate } = this.props.tasks;
        const { openModal, selectedDate, showModal } = this.props;

        console.log('tasksByDate', tasksByDate)
        
        const titleFormat = "D MMMM YYYY";
        const titleFormatted = dateFns.format(date, titleFormat);
        return (
            <div className="singleDayContainer">
                <h3 className="dayTitle">{`${titleFormatted}`}</h3>
                 <DailyTasks day={date} todaysTasks={todaysTasks}></DailyTasks>
                 <div className="singleDayFooter">
                    <Link to="/" onClick={closeModal} className="btn btn-secondary">Cancel</Link>
                    <Button onClick={openModal} className="btn btn-success create"> New Task </Button>
                    <TaskModal
                        closeModal={this.handleModalClose}
                        showModal={showModal}
                        selectedDate={selectedDate}
                        {...this.props}
                    />
                 </div>
            </div>          
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        tasksByDate: state.tasks.tasksByDate,
        selectedDate: state.general.selectedDate,
        showModal: state.general.showModal
    }
  }
  
  
  export default connect(mapStateToProps, {
      fetchTasks, 
      fetchTasksByDate,
      deleteTask,
      openModal,
      closeModal
  })(DayView);