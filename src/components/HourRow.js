import React from 'react';

const HourRow = ({hour, hourTasks}) => {
    return (
        <div className="hourRow">
            <span className="hour">{hour}</span>
            <span className="slot">
                {hourTasks}
            </span>
        </div>
    )
};

export default HourRow;