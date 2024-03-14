import { useState } from 'react';
import './App.css';
import bg1 from './assets/bg1.jpg';
import bg2 from './assets/bg2.jpg'
import Search from './components/Search.jsx';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const[bg,setBg]=useState(bg1);
  

  const handleSearchCondition = async (object) => {
    const { longitude, latitude, name } = object;
    setLoading(true);

    try {
      const currentWeatherFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=63821f7748b8038706a8db261f910f7a`);
      const forecastWeatherFetch = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=63821f7748b8038706a8db261f910f7a`);

      const [currentWeatherResponse, forecastWeatherResponse] = await Promise.all([
        currentWeatherFetch.json(),
        forecastWeatherFetch.json()
      ]);

      setCurrentWeather(currentWeatherResponse);
      setForecast(forecastWeatherResponse);
      console.log(currentWeatherResponse, forecastWeatherResponse);
      const bg = currentWeather && (currentWeather.weather[0].main === 'Clear') ? bg1 : bg2;
      setBg(bg)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

    const time = new Date().getTime(); // Get the current time in milliseconds
    const currentTime = new Date(time); 
    const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();
const seconds = currentTime.getSeconds();

// Formatting the time if needed (e.g., adding leading zeros)
const formattedTime = `${hours}:${minutes}:${seconds}`
    // Create a new Date object using the milliseconds
 




  

  const WEEK_DAYS=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  const dayInaWeek= new Date().getDay();
  
  const forecastDays = WEEK_DAYS.slice(dayInaWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInaWeek))
 
  return (
    <div className='container' style={{ backgroundImage: `url(${bg})` }}>
      <div className='top'>
      <div><h1>MeteorMinds</h1></div>
      <div className='time'>{formattedTime}|{WEEK_DAYS[dayInaWeek-1]}</div>

      </div>
      <div className='left'>
        <Search onSearch={handleSearchCondition} />

        {loading && <div>Loading...</div>}
        
        {currentWeather && (
          <div className='weather'>
            {Math.round(currentWeather.main.temp)}°C
          </div>
        )}
      
          {currentWeather && (
            <div className='details'>
            <div className='list'>
              <p>Feels Like: </p><p>{currentWeather.main.feels_like}°C</p>
            </div>
            <div className='list'>
            <p>Min Temp:</p><p> {Math.round(currentWeather.main.temp_min)}°C</p>
          </div>
          <div className='list'>
            <p>Max Temp: </p><p>{Math.round(currentWeather.main.temp_max)}°C</p>
          </div>
          <div className='list'>
            <p>Humidity: </p><p>{currentWeather.main.humidity}</p>
          </div>
          </div>
          )}
        
      </div>
      {currentWeather&&<h1 className='description'> {currentWeather && currentWeather.weather[0].description}</h1>}
    {forecast &&  <div className="bottom">
            {
               forecast.list.splice(0,5).map((item,index)=>{
                return(<div className='cards' key={index}>
                <h1>{forecastDays[index]}</h1>
          
            
                <img alt='weather' src={`icons/${item.weather[0].icon}.png`} className='icon-small'/>
                <h3>{Math.round(item.main.temp)}°C</h3>
                <p>{item.weather[0].description}</p>
              
              </div>)
              })
            }
           

      </div>}
    </div>
  );
}

export default App;
