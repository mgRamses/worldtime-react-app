import React,{useState, useEffect} from 'react';
import './styles.css';

const SearchBox = ({timezones, timezonesToShow, setTimezonesToShow}) => {
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState([]);

    const fetchTimezone = async (filteredTimezone) => {
        const cityResponse = await fetch(`http://worldtimeapi.org/api/timezone/${filteredTimezone}`).then(response => response.json());

        const names = cityResponse.timezone.split('/');
        const cityName = names[names.length - 1];
        const countryName = names[names.length - 2];

        const newCity = {
            id: timezonesToShow.length + 1,
            main: timezonesToShow.length == 0 ? true : false,
            name: cityName,
            country: countryName,
            raw_offset: cityResponse.raw_offset,
            datetime: cityResponse.datetime,
            abb: cityResponse.abbreviation,
        }

        setTimezonesToShow(prev => [...prev, newCity]);
        setSearchText('');
        setResults([]);
    }

    useEffect(()=>{
        if(searchText != ''){
            const results = timezones.filter(timezone => timezone.toLowerCase().includes(searchText));
            setResults(results)
        }else{
            setResults([]);
        }
    },[searchText]);

    return (
        <div className='search-container'>
            <input type="text" className='search-input' placeholder="Find place or timezone" onChange={event => setSearchText(event.target.value)} value={searchText}/>
            {results.length > 0 && (
                <div className="card-search-results">
                    {results.map((filteredTimezone, idx) => {
                        if(idx < 7 )
                        return <div key={idx} className="item-search-result" onClick={(filteredTimezone)=>fetchTimezone(filteredTimezone.target.outerText)}>{filteredTimezone}</div>
                        }
                    )}
                </div>)
            }
        </div>);
}

export default SearchBox;