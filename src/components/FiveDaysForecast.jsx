import * as React from "react";
import { Toast } from "react-bootstrap";

const FiveDaysForecast = (props) => {
    return (
        <Toast
            key={props.item.dt}
            style={{ height: "350px" }}
            className="mx-auto"
        >
            <Toast.Body>
                <p>
                    <b>{props.getDate(props.item.dt)}</b>
                </p>
                <p>утро: {props.item.temp.morn} &#8451;</p>
                <p>день: {props.item.temp.day} &#8451;</p>
                <p>вечер: {props.item.temp.eve} &#8451;</p>
                <p>ночь: {props.item.temp.night} &#8451;</p>
                <img
                    src={`https://openweathermap.org/img/wn/${props.item.weather[0].icon}.png`}
                    alt=""
                />
                <p>{props.item.weather[0].description}</p>
                <p>ветер: {props.item.wind_speed} м/сек</p>
            </Toast.Body>
        </Toast>
    );
};

export default FiveDaysForecast;
