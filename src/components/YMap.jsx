import * as React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import "../styles/YMap.css";

const YMap = (props) => {
    return (
        <YMaps query={{ apikey: "YOUR API KEY" }}>
            <Map state={props.defState} width="100%" height="400px">
                <Placemark geometry={props.defPlacemark} />
            </Map>
        </YMaps>
    );
};

export default YMap;
