
import './App.css'
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import clearIcon from "./assets/clear.png";
import cloudyIcon from "./assets/cloudy.png";
import diszzeIcon from "./assets/diszze.png";
import rainyIcon from "./assets/rainny.png";
import snowIcon from "./assets/snow.png";



const Weather=({icon,temp,city,country,lat,long,humi,wind})=> {
  return (
    <div>
     <div className='image'><img src={icon}  alt='clear'></img></div>
      <div className='temp'>{temp} °C</div>
      <div className='city'>{city}</div>
      <div className='country'>{country}</div>
      <div className='flex gap-50'></div>        

        <div className='cord' >
          <div>
            <span className="lat">Latitude</span>
            <span>{lat}</span>
          </div>
          
           <div>
            <span className="log">Longitude</span>
            <span>{long}</span>

           </div>
           </div>
           
        <div className='data' >
          <div>
            <span className="el"><WiHumidity size={30}/></span>
            <span>{humi}%</span>
            <h1>Humidity</h1>
          </div>
          
           <div>
            <span className="el"><FaWind size={20}/></span>
            <span>{wind} km/h</span>
            <h1>Wind Speed</h1>
            

           </div>
          
      
          

      </div>
    </div>
  );
};



function App() {
  let apiKey="84633b4f9f13ed57e0751be347d8f8c9"
   const[text,setText]=useState("Chennai");
   const[icon,setIcon]=useState(diszzeIcon);
   const[temp,setTemp]=useState(0);
   const[city,setCity]=useState("Chennai");
   const[country,setCountry]=useState("IN");
   const[lat,setLat]=useState(0);
   const[long,setlong]=useState(0);
   const[humi,setHuni]=useState(0);
   const[wind,setWind]=useState(0);
   const[cityNotFounded,setNotFounded]=useState(false);
   const[loading,setLoading]=useState(false);
   const[error,setError]=useState(null);

   const weatherIconMap={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudyIcon,
    "02n":cloudyIcon,
    "03d":cloudyIcon,
    "03n":cloudyIcon,
    "04d":cloudyIcon,
    "04n":cloudyIcon,
    "09d":rainyIcon,
    "09n":rainyIcon,
    "10d":rainyIcon,
    "10n":rainyIcon,
    "11d":rainyIcon,
    "11n":rainyIcon,
    "13d":snowIcon,
    "13n":snowIcon,
    "50d":diszzeIcon,
    "50n":diszzeIcon,

   }



   const Search=async ()=>{
    setLoading(true);
  
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`


  try{
    let res= await fetch(url);
    let data=await res.json();
    // console.log(data)
    if (data.cod === "404"){
      console.error("City not found");
      setNotFounded(true);
      setLoading(false);
      return;

    }

    setHuni(data.main.humidity);
    setWind(data.wind.speed);
    setLat(data.coord.lat);
    setlong(data.coord.lon);
    setTemp(data.main.temp);
    setCity(data.name);
    setCountry(data.sys.country);
    const weatherIconCode=data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconCode] || clearIcon );
    setNotFounded(false);

    


  }
  catch(error){
    console.error("An error Occurred:",error.message);
    setError("An error occurred while fetching data.");


  }
  finally{
    setLoading(false);

  }
}

const handleCity=(event)=>{
  setText(event.target.value);
  
  

}

const handleKey=(event)=>{
  if(event.key==="Enter"){
    Search();
  }
  
  


}

useEffect(function (){
  Search();
},[]);


  return (
    <section className='flex justify-center'>
      <div className='flex  justify-center m-45 border rounded-lg bg-blue-950 text-white p-10 w-100 h-auto'>
       <div>
        <div className='flex justify-center h-[41.2px]'><input className='border bg-white text-black border-blue-600 p-2 w-70 ' 
        type="text" placeholder='Search' onChange={handleCity} value={text} onKeyDown={handleKey}/>

        <FaSearch onClick={()=>{Search()}} className=' cursor-pointer bg-blue-900  text-white p-2 m-2 ml-0 mt-0 h-[41.2px]' size={35}/>
        </div>

        { !loading && !cityNotFounded&& !error&&<Weather icon={icon} temp={temp} city={city} country={country}
         lat={lat} long={long} humi={humi} wind={wind}/>}
    
       {loading && <div className=" flex justify-center text-green-500 m-5">Loading....</div>}
       {error && <div className="flex justify-center text-gray-400 m-5">{error}</div>}
       {cityNotFounded && <div className="flex justify-center text-gray-400 m-5">City Not Founded</div>}
       
       
       </div>
       
      
       
    </div>
    </section>
   
  )
}

export default App
