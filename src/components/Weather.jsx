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
          `https://api.openweathermap.org/data/3.0/onecall?lat=${props.coords[0]}&lon=${props.coords[1]}&cnt=5&exclude=current&lang=ru&units=metric&appid=1808d2c3e248867be50cfc0f471225f3`
        )
        .catch((err) => console.log(err));
      setWeather([data]);
      setLoading(false);
    };

    // getWeather();
  }, [props.coords]);

  if (isLoading) {
    return <h3>Загрузка...</h3>;
  }
//   console.log(weather);
  return (
    <>
    <Form>
          <Form.Check
            inline
            label="Прогноз на сегодня"
            name="group1"
            type="radio"
            id={`inline-radio-1`}
          />
          <Form.Check
            inline
            label="Прогноз на 5 дней"
            name="group1"
            type="radio"
            id={`inline-radio-2`}
          />
      
    </Form>

    <Stack direction="horizontal" gap={2} className="mt-4">
      
        <Toast>
          <Toast.Body>
            <p>clear</p>
            <p>clear-OK</p>
          </Toast.Body>
        </Toast>

        <Toast>
        
          <Toast.Body>
            <p>clear</p>
            <p>clear-OK</p>
          </Toast.Body>
        </Toast>
      
      
        <Toast>
        
          <Toast.Body>
            <p>clear</p>
            <p>clear-OK</p>
          </Toast.Body>
        </Toast>
      
      
        <Toast>
      
          <Toast.Body>
            <p>clear</p>
            <p>clear-OK</p>
          </Toast.Body>
        </Toast>
      
      
        <Toast>
         
          <Toast.Body>
            <strong>25.05.2023</strong>
            <p>clear</p>
            <p>clear-OK</p>
          </Toast.Body>
        </Toast>
      
    </Stack>
    </>
  );
}

export default Weather;
