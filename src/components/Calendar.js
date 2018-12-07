import React, { Component } from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from "react-router";
import { fetchTasks } from '../actions/TasksActions';
import { openModal, closeModal, changeMonth, selectDate, resizeWindow } from '../actions/GeneralActions';
import Header from './Header';
import Cells from './Cells';
import TaskModal from './TaskModal';
import MobileDailyTasks from './MobileDailyTasks';
import DayNames from './DayNames';

class Calendar extends Component {

    componentDidMount() {
      this.props.closeModal();  
      this.props.fetchTasks();
      window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
      this.props.resizeWindow(window.innerWidth);
    };



    onDateClick = (e, day) => {
      if(e.currentTarget.className.indexOf('mobileView') === -1) {
        this.props.history.push(`/${day}`);
      }
      this.props.selectDate(day);
    };

    nextMonth = () => {
      this.props.changeMonth(dateFns.addMonths(this.props.currentMonth, 1));
    };

    prevMonth = () => {
      this.props.changeMonth(dateFns.subMonths(this.props.currentMonth, 1));
    };

    handleModalClose = () => {
      this.props.closeModal();
      this.props.history.push('/');
      
    }

    render() {
      const { tasksByDate } = this.props.tasks;
      const { showModal, currentMonth, selectedDate, windowWidth, openModal } = this.props;
      const isMobile = windowWidth < 668;
      const todayFormat = "YYYY-MM-D";
      const mobileDisplayFormat = "D MMMM YYYY";
      const dayNameFormat = "ddd";
      const todayFormattedForMobileDisplay = dateFns.format(selectedDate, mobileDisplayFormat);
      const todayFormatted = dateFns.format(selectedDate, todayFormat);

      return (
        <div className="calendar">
          <Header 
            currentMonth={currentMonth} 
            prevMonth={this.prevMonth} 
            nextMonth={this.nextMonth} 
          />
          <DayNames 
            currentMonth={currentMonth} 
            dayNameFormat={dayNameFormat} 
          />
          <Cells 
            tasksByDate={tasksByDate} 
            onDateClick={this.onDateClick} 
            isMobile={isMobile} 
            todayFormat={todayFormat}
            todayFormatted={todayFormatted}
            {...this.props} 
           />

          { isMobile ?
            <MobileDailyTasks
              todayFormatted={todayFormatted}
              todayFormattedForDisplay={todayFormattedForMobileDisplay}
              onClickNewTask={openModal}
              tasksByDate={tasksByDate}
              {...this.props}
            />
            :
            <div className="stickyContainer">
              <Button className="newTaskButton" onClick={openModal}>+</Button>
            </div>
            
          }
          <TaskModal
            closeModal={this.handleModalClose}
            showModal={showModal}
            selectedDate={selectedDate}
            {...this.props}
            />
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    tasksByDate: state.tasks.tasksByDate,
    showModal: state.general.showModal,
    currentMonth: state.general.currentMonth,
    selectedDate: state.general.selectedDate,
    currentDay: state.general.currentDay,
    windowWidth: state.general.windowWidth
  }
};


export default connect(mapStateToProps, {
  fetchTasks,
  openModal,
  closeModal,
  changeMonth,
  selectDate,
  resizeWindow
}) (withRouter(Calendar));
