import * as React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "../styles/Weather.css";
import { Col, Row, Stack, Toast, Form } from "react-bootstrap";

function Weather(props) {
    const [isLoading, setLoading] = React.useState(true);
    const [weather, setWeather] = React.useState([]);

    const getDate = (dt) => {
        let _date = new Date(dt * 1000);
        // let hours = `${_date.getDate()}.${_date.getMonth()}.${_date.getFullYear()}`;
        let newDate = _date.toLocaleString();
        return newDate;
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

    if (isLoading) {
        return <h3>Загрузка...</h3>;
    }
    
    return (
        <>
            <Form className="mt-4">
                <Form.Check
                    inline
                    label="Погода на сегодня"
                    name="group1"
                    type="radio"
                    id={`inline-radio-1`}
                />
                <Form.Check
                    inline
                    label="Погода на 5 дней"
                    name="group1"
                    type="radio"
                    id={`inline-radio-2`}
                />
            </Form>

            <Stack direction="horizontal" gap={2} className="mt-4">
              {weather[0].daily.slice(0, 5).map(item => (
                <Toast key={item.dt}>
                    <Toast.Body>
                        <p>утро: {item.temp.morn} &#8451;</p>
                        <p>день: {item.temp.day} &#8451;</p>
                        <p>вечер: {item.temp.eve} &#8451;</p>
                        <p>ночь: {item.temp.night} &#8451;</p>
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                        <p>{item.weather[0].description}</p>
                        <p>ветер: {item.wind_speed} м/сек</p>
                    </Toast.Body>
                </Toast>
                
              ))}
            </Stack>
        </>
    );
}

export default Weather;
