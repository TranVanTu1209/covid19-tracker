import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';
const casesTypeColors = {
  cases: {
    hex: 'red',
    multiplier: 800
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 1200
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 2000
  }
}

// draw circle on map with the interactive tooltip
export const showDataOnMap = (data, casesType = 'cases') => (data.map((country, id) => (
  <Circle key={id} center={{ lat: country.countryInfo.lat, lng: country.countryInfo.long }}
    color={casesTypeColors[casesType].hex}
    fillColor={casesTypeColors[casesType].hex}
    radius={
      Math.sqrt(country[casesType] * casesTypeColors[casesType].multiplier) * 15
    }>
    <Popup>
      <div className="info__container" >
        <div className="info__flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
        <div className="info__name"> {country.country} </div>
        <div className="info__confirmed">Cases {numeral(country.cases).format("0,0")}  </div>
        <div className="info__recovered">Recovered {numeral(country.recovered).format("0,0")}</div>
        <div className="info__deaths">Deaths  {numeral(country.deaths).format("0,0")} </div>
      </div>

    </Popup>
  </Circle>
))
);