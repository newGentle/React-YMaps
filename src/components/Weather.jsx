import * as React from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import '../styles/Weather.css'

function Weather(props) {

    const [isLoading, setLoading] = React.useState(true);
    const [weather, setWeather] = React.useState([]);

    const getDate = (dt) => {
        let _date = new Date(dt * 1000)
        let hours = `${_date.getDate()}.${_date.getMonth()}.${_date.getFullYear()}`;
        let newDate = _date.toLocaleString();
        return newDate;
    }

    React.useEffect(() => {

        const getWeather = async () => {
            const { data } = await axios
                .get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${props.coords[0]}&lon=${props.coords[1]}&cnt=40&exclude=current&lang=uz&units=metric&appid=1808d2c3e248867be50cfc0f471225f3`
                )
                .catch((err) => console.log(err));
            setWeather([data]);
            setLoading(false);
        };
        
        getWeather();
    }, [props.coords]);
    
    if (isLoading) {
        return (
            <h3>Загрузка...</h3>
        )
    }
    
    return (
        
        <Table bordered width='100%' responsive>
            <thead>
                <tr>
                    <th>мин. Темп</th>
                    <th>Температура</th>
                    <th>макс. Темп</th>
                    <th>Погода</th>
                    <th>Ветер</th>
                    <th>Дата</th>
                </tr>
            </thead>
            <tbody>
            {weather[0].list.map((data) => (
                <tr key={data.dt}>
                    <td>{parseInt(data.main.temp_min)} &#8451;</td>
                    <td>{parseInt(data.main.temp)} &#8451;</td>
                    <td>{parseInt(data.main.temp_max)} &#8451;</td>
                    <td> <img
                        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                        alt="weather-icon"
                    />
                    </td>
                    <td>{data.wind.speed} м.сек.</td>
                    <td>{getDate(data.dt)}</td>
                    </tr>
            ))}
            </tbody>
        </Table>
        
    );
}

export default Weather;
