import * as React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Weather from "./Weather";

const YMap = () => {
    const [coord, setCoord] = React.useState([55.751244, 37.618423]);

    let defState = {
        center: coord,
        zoom: 11,
    };

    let defPlacemark = coord;

    const geoData = () => {
        // setCoord(Array.from(document.getElementById('GEO').value.split(" ")));
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCoord([latitude, longitude]);
        });
    };

    return (
        <YMaps query={{ apikey: "8b56a857-f05f-4dc6-a91b-bc58f302ff21" }}>
            <Map state={defState}>
                <Placemark
                    geometry={defPlacemark}
                    properties={{ balloonContentBody: "OK" }}
                />
            </Map>
            <input type="text" id="GEO" />
            <button type="submi">search</button>
            <button type="submit" onClick={geoData}>
                Определить местоположение
            </button>
            <Weather coords={defPlacemark} />
        </YMaps>
    );
};

export default YMap;
