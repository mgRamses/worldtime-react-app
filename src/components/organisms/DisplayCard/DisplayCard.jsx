import React, {useState, useEffect, useRef} from "react";
import './styles.css'
import SearchBox from '../../atoms/SearchBox';
import ItemTimezone from '../../molecules/ItemTimezone';
import ListDay from '../../atoms/ListDays';

const DisplayCard = () => {
  const [timezones, setTimezones] = useState();
  const [timezonesToShow, setTimezonesToShow] = useState([]);
  const [mainCity, setMainCity] = useState({});
  const [barPositionX, setBarPositionX] = useState(0);

  const bar = useRef(null);

  const deleteCity = (cityId) => {
    const updatedCities = timezonesToShow.filter(function(obj){
      return obj.id !== cityId;
    });

    setTimezonesToShow(updatedCities);
  }

  const reorder = (id) =>{
    setBarPositionX(bar.current.style.left);
    const tempArray = [...timezonesToShow];

    const idx = tempArray.findIndex(timezone => timezone.id == id);
    const tmp = timezonesToShow[idx];
    tmp.main = true;
    
    tempArray[idx] = tempArray[0];
    tempArray[idx].main = false;
    tempArray[0] = tmp;

    setTimezonesToShow(tempArray);
    
  }

  let offsetX, _clientX;
  let hasLeft = false;

  const onMouseMove = (e) => {
    const el = e.target;

    if(e.pageX - _clientX > 0 && 575 > e.pageX - _clientX){
      bar.current.style.left = `${e.pageX - _clientX}px`;
    }
  }


  const handleEvent = (e) => {
    const el = e.target;
 
    offsetX = e.clientX - el.getBoundingClientRect().left;

    if(!hasLeft){
      _clientX = e.clientX;
      hasLeft = true;
    }

    if(barPositionX){
      _clientX = _clientX - barPositionX - 15;

    }

    window.addEventListener('mousemove', onMouseMove);
  }

  const handleMouseUp = (e) => {
    const el=e.target
    window.removeEventListener('mousemove',onMouseMove);

    setBarPositionX(el.getBoundingClientRect().left - _clientX);
  }

  useEffect(()=>{
    if(timezonesToShow.length > 0){
    setMainCity(timezonesToShow[0]);
    }
   }, [timezonesToShow]);

  useEffect(()=>{
    fetch('http://worldtimeapi.org/api/timezone').then(response => response.json()).then(data => setTimezones(data));
  },[])

  return (
    <div className="main"> 
      <SearchBox timezones={timezones} setTimezonesToShow={setTimezonesToShow} timezonesToShow={timezonesToShow}/>
      <div style={{display: 'flex', justifyContent: 'space-between'}} >
        <div>
            {timezonesToShow.map(city => (<ItemTimezone key={city.id} cityInfo={city} deleteCity={deleteCity} offsetCompare={mainCity.raw_offset} reorder={reorder}/>))}
        </div>
        <div style={{position: 'relative'}} >
          {timezonesToShow.length > 0 && <div ref={bar} id='bar' className='bar-selector' onMouseDown={handleEvent} onMouseUp={handleMouseUp} ></div>}
          {timezonesToShow.map((city, idx) => (<ListDay key={idx} cityInfo={city} offsetCompare={mainCity.raw_offset}/>))}
        </div>
      </div>
    </div>);
};

export default React.memo(DisplayCard);
