import * as React from "react";
import axios from "axios";

function Weather(props) {

    const [weather, setWeather] = React.useState([]);

    React.useEffect(() => {

        const getWeather = async () => {
            const { data } = await axios
                .get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${props.coords[0]}&lon=${props.coords[1]}&cnt=1&lang=ru&units=metric&appid=1808d2c3e248867be50cfc0f471225f3`
                )
                .catch((err) => console.log(err));
            setWeather([data]);
        };
        
        getWeather();
    }, [props.coords]);
    
    console.log(weather[0].list[0].dt_txt)
    
    return (
        
        <table>
            <tbody>
            <tr>
                <th>Город</th>
                <th>Температура</th>
                <th>Погода</th>
                <th>Ветер</th>
                <th>Время</th>
            </tr>
            {weather.map((data) => (
                <tr key={data.city.id}>
                   
                    <td>{data.city.name}</td>
                    {/* <td>{data.list[0]} С</td>
                    <td> <img
                        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                        alt="weather-icon"
                    />
                    </td>
                    <td>{data.list.wind.speed} м.с.</td>
                    <td>{data.list.dt_txt}</td> */}
                    </tr>
            ))}
            </tbody>
        </table>
        
    );
}

export default Weather;
