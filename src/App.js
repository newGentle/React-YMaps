import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import * as React from "react";
import axios from "axios";
import YMap from "./components/YMap";
import Weather from "./components/Weather";
import { Stack, Container } from "react-bootstrap";
import GetCityFromList from "./components/GetCityFromList";
import SearchForm from "./components/SearchForm";
import CurrentLocation from "./components/CurrentLocation";
import { listOfCities } from "./components/ListOfCities";

function App() {
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

    const selectCity = (e) => {
        setCity(e.target.textContent);
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

    return (
        <div className="App">
            <Container>
                <SearchForm getCity={getCity} />

                <YMap defState={defState} defPlacemark={defPlacemark} />
                <Stack
                    direction="horizontal"
                    gap={3}
                    style={{ alignContent: "center", justifyContent: "center" }}
                    className="mt-4"
                >
                    <CurrentLocation geoData={geoData} />

                    <GetCityFromList
                        listOfCities={listOfCities}
                        selectCity={selectCity}
                    />
                </Stack>
                <Weather coords={defPlacemark} />
            </Container>
        </div>
    );
}

export default App;
