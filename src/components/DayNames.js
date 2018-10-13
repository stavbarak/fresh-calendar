import React from 'react';
import dateFns from 'date-fns';

const DayNames = ({ dayNameFormat, currentMonth }) => {
    const dayNames = [];
    let startDate = dateFns.startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
        dayNames.push(
            <div className="col col-center" key={i}>
                {dateFns.format(dateFns.addDays(startDate, i), dayNameFormat)}
            </div>
        );
    }
    return <div className="days row">{ dayNames }</div>;
}


export default DayNames;