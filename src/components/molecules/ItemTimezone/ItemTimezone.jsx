import React from 'react';
import './styles.css';
import DeleteIcon from '../../../assets/delete.png'
import HomeIcon from '../../../assets/home-button.png'
import { useDate } from '../../../hooks/useDate';

const ItemTimezone = ({cityInfo, deleteCity, offsetCompare, reorder}) => {
    
    const handleDeletecity = (cityId) =>{
        deleteCity(cityId);
    }
    const differenceHours = (cityInfo.raw_offset - offsetCompare) / 3600;
    
    const { date, time } = useDate(differenceHours, cityInfo.datetime);

    const handleReorder = () =>{
        if(!cityInfo.main){
            reorder(cityInfo.id);
        }
    }

    return (
    <div className="main-timezone">
        <div className='info-timezone'>
            <div className="left">
                <div className="delete-button" onClick={() => handleDeletecity(cityInfo.id)}><img src={DeleteIcon} alt="" /></div>
                <div className="home-button" onClick={()=>handleReorder()}>
                  {cityInfo.main ? <img src={HomeIcon} alt="" /> : differenceHours < 0 ? differenceHours : `+${differenceHours}`}
                </div>
                <div className="city-info">
                    <div className="city-name">{cityInfo.name}</div>
                    <div className="country-name">{cityInfo.country}</div>
                </div>
            </div>
            <div className="right">
                <div className="city-name">{time.toLowerCase().replace(/ /g, '')} {cityInfo.abb}</div>
                <div className="country-name">{date}</div>
            </div>
        </div>
    </div>);
}

export default ItemTimezone;