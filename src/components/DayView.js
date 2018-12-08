import React, { Component } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TaskModal from './TaskModal';
import { fetchTasks, deleteTask, fetchTasksByDate } from '../actions/TasksActions';
import { closeModal , openModal} from '../actions/GeneralActions';
import DailyTasks from './DailyTasks';
import HourRow from './HourRow';

class DayView extends Component {
    componentDidMount() {   
        const {date} = this.props.match.params;
        this.props.fetchTasks();
        this.props.fetchTasksByDate(date);
      }

    render() {
        const {date} = this.props.match.params;
        const { selectedDate, showModal } = this.props;
        const { tasksByDate } = this.props.tasks;
        const dayStart = dateFns.startOfDay(selectedDate);
        const dayEnd = dateFns.startOfDay(selectedDate);
        const hourFormat = "HH:mm"
        const hourCheckformat = "HH";
        const todaysTasks = tasksByDate[date];
        console.log('todaysTasks:', tasksByDate[date])

        
        const startHour = dateFns.format(dayStart, hourFormat);
        const endHour = dateFns.format(dayEnd, hourFormat);

        
       
        const rows = [];
        let hour = startHour;
            for (let i = 1; i <= 24; i++) {   
                let hourTasks = [];             
                let nextHour = dateFns.format(dateFns.addHours(dayStart, i), hourFormat);
                rows.push(
                    <HourRow key={i} hour={hour} hourTasks={hourTasks} ></HourRow>
                )
                hour = nextHour;
            }
   

        return (
            <div className="dayContainer">
                { rows }
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