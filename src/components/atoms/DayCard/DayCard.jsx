import React from 'react';
import './styles.css';

const DayCard = ({dayType, hour, meridiem}) => {
    
    return (
        <div className={`day-card ${dayType} ${hour === 11 && meridiem === 'pm' ? `last-hour` : ``} ${meridiem != 'am' && meridiem != 'pm' ? `first-hour` : ``}` }>
            <div className={`${meridiem != 'am' && meridiem != 'pm' ? 'small-month' : 'date'}`}>
                {hour}
            </div>
            <div className={`${meridiem != 'am' && meridiem != 'pm' ? 'small-day' : 'meridiem-status'}`}>
                {meridiem }
            </div>
        </div>)
}

export default DayCard;