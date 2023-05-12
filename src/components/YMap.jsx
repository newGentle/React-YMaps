import * as React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Weather from "./Weather";
import "../styles/YMap.css";
import { Button, Form, Stack, Container, Dropdown } from "react-bootstrap";
import axios from "axios";

const YMap = () => {
    const [coord, setCoord] = React.useState([55.751244, 37.618423]);
    const [city, setCity] = React.useState("Москва");

    let defState = {
        center: coord,
        zoom: 12,
    };

    let defPlacemark = coord;

    const geoData = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCoord([latitude, longitude]);
        });
    };

    const getCity = () => {
        const cityName = document.querySelector(".search_field").value;
        setCity(cityName);
        document.querySelector(".search_field").value = "";
    };

    React.useEffect(() => {
        const getCityName = async () => {
            await axios
                .get(
                    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=1808d2c3e248867be50cfc0f471225f3`
                )
                .then((data) => setCoord([data.data[0].lat, data.data[0].lon]))
                .catch(() => alert("Введите имя города"));
        };
        getCityName();
    }, [city]);

    const listOfCities = [
        "Чунцин",
        "Токио",
        "Шанхай",
        "Дели",
        "Каир",
        "Стамбул",
        "Манила",
        "Париж",
        "Москва",
        "Санкт Петербург",
        "Мекка",
    ];

    const selectCity = (e) => {
        setCity(e.target.textContent);
    };

    return (
        <Container>
            <YMaps query={{ apikey: "8b56a857-f05f-4dc6-a91b-bc58f302ff21" }}>
                <Stack direction="horizontal" gap={3}>
                    <Form.Control
                        type="text"
                        placeholder="Введите название города"
                        className="search_field"
                    />

                    <Button type="submit" onClick={getCity}>
                        Поиск
                    </Button>
                </Stack>
                <Map state={defState} width="100%" height="400px">
                    <Placemark geometry={defPlacemark} />
                </Map>
                <Stack
                    direction="horizontal"
                    gap={3}
                    style={{ alignContent: "center", justifyContent: "center" }}
                    className="mt-4"
                >
                    <Button onClick={geoData} variant="outline-light">
                        <svg
                            fill="#000000"
                            version="1.1"
                            id="Capa_1"
                            width="30px"
                            height="30px"
                            viewBox="0 0 395.71 395.71"
                        >
                            <g>
                                <path
                                    d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
                                />
                            </g>
                        </svg>
                        <span>Определить</span>
                    </Button>
                    <Dropdown>
                        <Dropdown.Toggle>Выберите город</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {listOfCities.map((item, idx) => (
                                <Dropdown.Item key={idx} onClick={selectCity}>
                                    {item}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Stack>

                <Weather coords={defPlacemark} />
            </YMaps>
        </Container>
    );
};

export default YMap;
