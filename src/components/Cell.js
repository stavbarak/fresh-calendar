import React from 'react';
import dateFns from 'date-fns';
import DailyTasks from './DailyTasks';

const Cell = ({
  day,
  currentDay,
  currentMonth,
  selectedDate,
  onDateClick,
  cloneDay,
  formattedDayCellDisplay,
  formattedDayOfTasks,
  monthStart,
  todaysTasks,
  isMobile
}) => {
    const isToday = dateFns.isSameDay(day, currentDay);
    const isSelected = dateFns.isSameDay(day, selectedDate);
    const isDisabled = !dateFns.isSameMonth(day, monthStart);

    let classes = 'col cell';
    
    if (isMobile) classes += " mobileView"
    if(isDisabled){
        classes += " disabled";
    } else {
        if (isToday) classes += " today";
        if (isSelected) classes += " selected";
        if (todaysTasks.length > 0) classes += " dayWithTasks"       
    } //dateFns.parse(cloneDay)
    return (
        <div className={classes} key={day} onClick={(e) => onDateClick(e, formattedDayOfTasks)} >
            <div className="numberContainer">
                <div className="number">{formattedDayCellDisplay}</div>
            </div>

            <DailyTasks day={day} todaysTasks={todaysTasks} />
        </div>
    )

}

export default Cell;
