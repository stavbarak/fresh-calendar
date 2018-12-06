import React, { Component } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchTasks, deleteTask, fetchTasksByDate } from '../actions/TasksActions';
import { closeModal , openModal} from '../actions/GeneralActions';
import DailyTasks from './DailyTasks';

class DayView extends Component {
    componentDidMount() {   
        console.log('day view mount')  
        const {date} = this.props.match.params;
        this.props.fetchTasksByDate(date);
      }

    render() {
        const {date} = this.props.match.params;
        const { todaysTasks } = this.props.tasks;
    
        const titleFormat = "D MMMM YYYY";
        const titleFormatted = dateFns.format(date, titleFormat);
        console.log('todaysTasks: ', todaysTasks)
        return (
            <div className="singleDayContainer">
                <h3>{`${titleFormatted}`}</h3>
                 <DailyTasks day={date} todaysTasks={todaysTasks}></DailyTasks>
            </div>          
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks    
    }
  }
  
  
  export default connect(mapStateToProps, {
      fetchTasks, 
      fetchTasksByDate,
      deleteTask,
      closeModal
  })(DayView);