import React from 'react';
import DayCard from '../../atoms/DayCard';
import './styles.css';
import moment from 'moment';

const ListDay = ({cityInfo, offsetCompare}) => {
    const differenceHours = (cityInfo.raw_offset - offsetCompare) / 3600;

    const currentDay = moment().format('DD');
    const tomorrowDay =  moment().add(24, "hours").format('DD');

    const currentMonth = moment().format('MMM');
    const tomorrowMonth = moment().add(24, "hours").format('MMM');

    const hours = [
        {
            hour: currentMonth,
            meridiem: currentDay,
            lum: 'dark'
        },
        {
            hour: 1,
            meridiem: 'am',
            lum: 'dark'
        },
        {
            hour: 2,
            meridiem: 'am',
            lum: 'dark'
        },
        {
            hour: 3,
            meridiem: 'am',
            lum: 'dark'
        },
        {
            hour: 4,
            meridiem: 'am',
            lum: 'dark',
        },
        {
            hour: 5,
            meridiem: 'am',
            lum: 'dark'
        },
        {
            hour: 6,
            meridiem: 'am',
            lum: 'early-morning',
        },
        {
            hour: 7,
            meridiem: 'am',
            lum: 'early-morning',
        },{
            hour: 8,
            meridiem: 'am',
            lum: 'light'
        },
        {
            hour: 9,
            meridiem: 'am',
            lum: 'light'
        },
        {
            hour: 10,
            meridiem: 'am',
            lum: 'light'
        },
        {
            hour: 11,
            meridiem: 'am',
            lum: 'light'
        },
        {
            hour: 12,
            meridiem: 'pm',
            lum: 'light'
        },
        {
            hour: 1,
            meridiem: 'pm',
            lum: 'light'
        },
        {
            hour: 2,
            meridiem: 'pm',
            lum: 'light'
        },
        {
            hour: 3,
            meridiem: 'pm',
            lum: 'light'
        },
        {
            hour: 4,
            meridiem: 'pm',
            lum: 'light'
        },
        {
            hour: 5,
            meridiem: 'pm',
            lum: 'light'
        },
        {
            hour: 6,
            meridiem: 'pm',
            lum: 'early-morning'
        },
        {
            hour: 7,
            meridiem: 'pm',
            lum: 'early-morning'
        },
        {
            hour: 8,
            meridiem: 'pm',
            lum: 'early-morning'
        },
        {
            hour: 9,
            meridiem: 'pm',
            lum: 'early-morning'
        },
        {
            hour: 10,
            meridiem: 'pm',
            lum: 'dark'
        },
        {
            hour: 11,
            meridiem: 'pm',
            lum: 'dark'
        },
    ];

    if(differenceHours > 0){
        hours[0].hour = tomorrowMonth;
        hours[0].meridiem = tomorrowDay;
    }

    const tmp_1 = hours.slice(0, differenceHours);
    const tmp_2 = hours.slice(differenceHours);
    
    const updatedList = [...tmp_2, ...tmp_1];

    return (
        <div className='day-list'>
            {
                updatedList.map(hour => (
                    <DayCard key={`${hour.hour}${hour.meridiem}`} dayType={hour.lum} hour={hour.hour} meridiem={hour.meridiem}/>
                ))
            }

        </div>);
}

export default ListDay;