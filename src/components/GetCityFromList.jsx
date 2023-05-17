import * as React from 'react';

import { Dropdown } from 'react-bootstrap';

const GetCityFromList = (props) => {
    return (
        <Dropdown>
            <Dropdown.Toggle>Выберите город</Dropdown.Toggle>
            <Dropdown.Menu>
                {props.listOfCities.map((item, idx) => (
                    <Dropdown.Item key={idx} onClick={props.selectCity}>
                        {item}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default GetCityFromList;
