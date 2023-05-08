import * as React from "react";
import axios from "axios";

function Weather(props) {
    const [weather, setWeather] = React.useState([]);

    React.useEffect(() => {
        // setCoords(props.coords);

        const getWeather = async () => {
            const { data } = await axios
                .get(
                    `https://api.openweathermap.org/data/3.0/weather?lat=${props.coords[0]}&lon=${props.coords[1]}&lang=ru&units=metric&appid=1808d2c3e248867be50cfc0f471225f3`
                )
                .catch((err) => console.log(err));
            setWeather([data]);
        };
        getWeather();
    }, [props.coords]);

    return (
        <>
        <table>
            <tr>
                <th>Город</th>
                <th>Температура</th>
                <th>Погода</th>
                <th>Ветер</th>
                <th>Время</th>
            </tr>
            {weather.map((data) => (
                <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.main.temp} С</td>
                    <td> <img
                        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                        alt="weather-icon"
                    />
                    </td>
                    <td>{data.wind.speed} м.с.</td>
                    <td>{Date.now()}</td>
                </tr>
            ))}
        </table>
        </>
    );
}

export default Weather;
