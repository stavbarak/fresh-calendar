import React from 'react';
import dateFns from 'date-fns';
import Cell from './Cell';

const Cells = ({ 
    tasksByDate, 
    currentDay, 
    currentMonth, 
    selectedDate, 
    onDateClick, 
    isMobile, 
    todayFormat 
}) => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dayCellDisplayFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDayCellDisplay = "";
    let formattedDayOfTasks = "";


    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
          let todaysTasks = [];
          formattedDayOfTasks = dateFns.format(day, todayFormat);
          formattedDayCellDisplay = dateFns.format(day, dayCellDisplayFormat);
          if(tasksByDate && tasksByDate[formattedDayOfTasks]) {
              if(todaysTasks.length < 1) {
                  todaysTasks = tasksByDate[formattedDayOfTasks];
              } else {
                  todaysTasks.concat(tasksByDate[formattedDayOfTasks]);
                  console.log('todaysTasks of ' + formattedDayOfTasks+ ' is ' + todaysTasks)
              }
          }
          days.push(
              <Cell
                  key = { i }
                  day = { day }
                  todaysTasks = { todaysTasks }
                  currentDay = { currentDay }
                  monthStart = { monthStart }
                  selectedDate = { selectedDate }
                  formattedDayOfTasks = { formattedDayOfTasks }
                  formattedDayCellDisplay = { formattedDayCellDisplay }
                  onDateClick = { onDateClick }
                  isMobile = { isMobile }                
              />
          );
          day = dateFns.addDays(day, 1);
      }
      rows.push(
          <div className="row" key={day}>
            { days }
          </div>
      );
      days = [];
    }
    return (
        <div className="body">
            { rows }
        </div>
    )
}

export default Cells;
