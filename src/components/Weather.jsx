import * as React from "react";
import axios from "axios";
import "../styles/Weather.css";
import { Stack, Toast, Form, Table, ListGroup } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

function Weather(props) {
    const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 768px)" });
    const [isLoading, setLoading] = React.useState(true);
    const [weather, setWeather] = React.useState([]);
    const [fiveDaysForecast, setFiveDaysForecast] = React.useState(false);
    const [oneDayForecast, setOneDayForecast] = React.useState(true);

    const getDate = (dt) => {
        let _date = new Date(dt * 1000);
        let newDate = _date.toLocaleDateString("ru-RU");
        return newDate;
    };

    const getTime = (dt) => {
        let _time = new Date(dt * 1000);
        let newTime = `${_time.getHours()}:${_time.getMinutes()}`;
        return newTime;
    };

    React.useEffect(() => {
        const getWeather = async () => {
            const { data } = await axios
                .get(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${props.coords[0]}&lon=${props.coords[1]}&exclude=current,minutely,hourly,alerts&lang=ru&units=metric&appid=1808d2c3e248867be50cfc0f471225f3`
                )
                .catch((err) => console.log(err));
            setWeather([data]);
            setLoading(false);
        };

        getWeather();
    }, [props.coords]);

    const days = (event) => {
        if (event.target.id === "days-5-radio") {
            setFiveDaysForecast(true);
            setOneDayForecast(false);
        } else {
            setFiveDaysForecast(false);
            setOneDayForecast(true);
        }
    };

    if (isLoading) {
        return <h3>Загрузка...</h3>;
    }

    return (
        <>
            <Form className="mt-4">
                <Form.Check
                    checked={oneDayForecast}
                    onChange={days}
                    inline
                    label="Погода на сегодня"
                    name="group1"
                    type="radio"
                    id={`day-1-radio`}
                />
                <Form.Check
                    checked={fiveDaysForecast}
                    onChange={days}
                    inline
                    label="Погода на 5 дней"
                    name="group1"
                    type="radio"
                    id={`days-5-radio`}
                />
            </Form>

            {fiveDaysForecast ? (
                <Stack
                    direction={isDesktopOrLaptop ? "horizontal" : "vertical"}
                    gap={2}
                    className="mt-4"
                >
                    {weather[0].daily.slice(0, 5).map((item) => (
                        <Toast
                            key={item.dt}
                            style={{ height: "350px" }}
                            className="mx-auto"
                        >
                            <Toast.Body>
                                <p>
                                    <b>{getDate(item.dt)}</b>
                                </p>
                                <p>утро: {item.temp.morn} &#8451;</p>
                                <p>день: {item.temp.day} &#8451;</p>
                                <p>вечер: {item.temp.eve} &#8451;</p>
                                <p>ночь: {item.temp.night} &#8451;</p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                    alt=""
                                />
                                <p>{item.weather[0].description}</p>
                                <p>ветер: {item.wind_speed} м/сек</p>
                            </Toast.Body>
                        </Toast>
                    ))}
                </Stack>
            ) : (
                <Stack className="mt-4">
                    <Toast style={{ width: "100%" }}>
                        <Toast.Body>
                            <h3>{getDate(weather[0].daily[0].dt)}</h3>
                            <hr />
                            {isDesktopOrLaptop ? (
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Восход</th>
                                            <th>Закат</th>
                                            <th>Утро</th>
                                            <th>День</th>
                                            <th>Вечер</th>
                                            <th>Ночь</th>
                                            <th>Ветер</th>
                                            <th>Погода</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {getTime(
                                                    weather[0].daily[0].sunrise
                                                )}
                                            </td>
                                            <td>
                                                {getTime(
                                                    weather[0].daily[0].sunset
                                                )}
                                            </td>
                                            <td>
                                                {weather[0].daily[0].temp.morn}{" "}
                                                &#8451;
                                            </td>
                                            <td>
                                                {weather[0].daily[0].temp.day}{" "}
                                                &#8451;
                                            </td>
                                            <td>
                                                {weather[0].daily[0].temp.eve}{" "}
                                                &#8451;
                                            </td>
                                            <td>
                                                {weather[0].daily[0].temp.night}{" "}
                                                &#8451;
                                            </td>
                                            <td>
                                                {weather[0].daily[0].wind_speed}{" "}
                                                м/сек.
                                            </td>
                                            <td>
                                                {" "}
                                                <img
                                                    src={`https://openweathermap.org/img/wn/${weather[0].daily[0].weather[0].icon}@2x.png`}
                                                    alt=""
                                                />
                                                <p>
                                                    {
                                                        weather[0].daily[0]
                                                            .weather[0]
                                                            .description
                                                    }
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            ) : (
                                <ListGroup>
                                    <ListGroup.Item>
                                        Восход -{" "}
                                        {getTime(weather[0].daily[0].sunrise)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Закат -{" "}
                                        {getTime(weather[0].daily[0].sunset)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Утро - {weather[0].daily[0].temp.morn}{" "}
                                        &#8451;
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        День - {weather[0].daily[0].temp.day}{" "}
                                        &#8451;
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Вечер - {weather[0].daily[0].temp.eve}{" "}
                                        &#8451;
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Ночь - {weather[0].daily[0].temp.night}{" "}
                                        &#8451;
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Ветер - {weather[0].daily[0].wind_speed}{" "}
                                        м/сек.
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Погода -{" "}
                                        {
                                            weather[0].daily[0].weather[0]
                                                .description
                                        }
                                    </ListGroup.Item>
                                </ListGroup>
                            )}
                        </Toast.Body>
                    </Toast>
                </Stack>
            )}
        </>
    );
}

export default Weather;
