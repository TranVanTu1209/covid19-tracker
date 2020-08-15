import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../utils/map';

const Map = ({ center, zoom, mapCountries, casesType }) => {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom} >
        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {
          showDataOnMap(mapCountries, casesType)
        }
      </LeafletMap>
    </div>
  )
}

export default Map;
