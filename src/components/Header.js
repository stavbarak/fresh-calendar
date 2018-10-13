import React from 'react';
import dateFns from 'date-fns';

const Header = ({ currentMonth, nextMonth, prevMonth }) => {
    const dateFormat = "MMMM YYYY";
    return (
        <div className="header row flex-middle">
            <div className="col col-start">
            <div className="icon" onClick={prevMonth}>
                chevron_left
            </div>
            </div>
            <div className="col col-center">
            <span>
                {dateFns.format(currentMonth, dateFormat)}
            </span>
            </div>
            <div className="col col-end" onClick={nextMonth}>
            <div className="icon">chevron_right</div>
            </div>
        </div>
    );
};

export default Header;