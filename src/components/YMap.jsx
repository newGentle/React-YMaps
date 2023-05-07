import * as React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const YMap = () => {
    const [ coord, setCoord ] = React.useState([]);
    const geoData = () => {
        // setCoord(Array.from(document.getElementById('GEO').value.split(" ")));
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            setCoord([latitude, longitude])
        })
        
    };
    const change = () => {
        setCoord([55.26, 34.45]);
    }

    return (
        <YMaps query={{ apikey: "8b56a857-f05f-4dc6-a91b-bc58f302ff21" }}>
            <Map state={{ center: coord, zoom: 11 }} >

            <Placemark geometry={ coord } properties={{ balloonContentBody: 'OK'}}/>
            
            
            </Map>
            <input type="text" id='GEO' />
            <button type="submit" onClick={geoData}>search</button>
            <button type="submi" onClick={change}>search</button>
        </YMaps>
    )
};

export default YMap;