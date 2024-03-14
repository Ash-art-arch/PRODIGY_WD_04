import React, { useState } from 'react'

const Search = ({onSearch}) => {
    const [search,setSearch] = useState('')
    const [object, setObject] = useState({})
    const handleClick = async () => {
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?namePrefix=${search}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5a4e38b12fmshba8d73cf946dbacp157d8cjsn331398f67988',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            const searchObject = { latitude: result.data[0].latitude, longitude: result.data[0].longitude, name: result.data[0].name };
            console.log(searchObject);
            onSearch(searchObject);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
    <div className='search'>
        <input type="text" placeholder='Search for Your City' 
            value={search} onChange={(e)=>setSearch(e.target.value)}
        />
        <button onClick={()=>handleClick()}><i class="ri-search-line"></i></button>
    </div>
  )
}

export default Search