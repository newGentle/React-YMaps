import * as React from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';

function Weather(props) {

    const [isLoading, setLoading] = React.useState(true);
    const [weather, setWeather] = React.useState([]);

    React.useEffect(() => {

        const getWeather = async () => {
            const { data } = await axios
                .get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${props.coords[0]}&lon=${props.coords[1]}&cnt=1&lang=uz&units=metric&appid=1808d2c3e248867be50cfc0f471225f3`
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
            {weather.map((data) => (
                <tr key={data.city.id}>
                    <td>{parseInt(data.list[0].main.temp_min)} &#8451;</td>
                    <td>{parseInt(data.list[0].main.temp)} &#8451;</td>
                    <td>{parseInt(data.list[0].main.temp_max)} &#8451;</td>
                    <td> <img
                        src={`http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`}
                        alt="weather-icon"
                    />
                    {data.list[0].weather[0].main}
                    </td>
                    <td>{data.list[0].wind.speed} м.сек.</td>
                    <td>{data.list[0].dt_txt.slice(0,10)}</td>
                    </tr>
            ))}
            </tbody>
        </Table>
        
    );
}

export default Weather;
