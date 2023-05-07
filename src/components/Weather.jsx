import * as React from 'react';
import axios from 'axios';


function Weather() {
    const [weather, setWeather] = React.useState();
    const Url = 'https://api.openweathermap.org/data/2.5/weather?lat=55.26&lon=37.46&appid=1808d2c3e248867be50cfc0f471225f3';
    React.useEffect( () => {
        axios.get(Url).then((res) => { setWeather(res.data) }).catch((err) => console.log(err));
    },
    );

    
    
    return (
        <>
            <h2>{`${weather.coord.lat}`}</h2>
        </>
    )
};

export default Weather;