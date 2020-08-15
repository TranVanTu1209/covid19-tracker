import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import { Card, CardContent } from '@material-ui/core';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import 'leaflet/dist/leaflet.css';
import firebase from './firebase';
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 14.20423, lng: -33.38421 });
  const [mapZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/all')
      .then(res => {
        setCountryInfo(res.data);
      }).catch(err => console.log(err.message));
  }, []);
  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then(res => {
        const countries = res.data.map(d => {
          return {
            name: d.country, value: d.countryInfo.iso2
          }
        });
        setCountries(countries);
        setMapCountries(res.data);
        setTableData(res.data.sort((a, b) => b.cases - a.cases));
      }).catch(err => console.log(err.message));
  }, []);

  const onCountryChange = async e => {
    const countryCode = e.target.value;
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await axios.get(url)
      .then(res => {
        setCountry(countryCode);
        setCountryInfo(res.data);
        setMapCenter({ lat: res.data.countryInfo.lat, lng: res.data.countryInfo.long });
      }).catch(err => console.log(err.message));
  }
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1 className="app__title">
            Covid-19 Tracker App
          </h1>
          <FormControl className="app__dropdown" >
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">worldwide </MenuItem>
              {
                countries.map(ct => (<MenuItem key={ct.name} value={ct.value} > {ct.name} </MenuItem>))
              }
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox active={casesType === 'cases'} onClick={() => {
            setCasesType('cases');
          }} classes="box__cases"
            title={`Today cases in ${countryInfo.country ? countryInfo.country : "worldwide"}`}
            cases={countryInfo.todayCases} total={countryInfo.cases} />

          <InfoBox active={casesType === 'recovered'} onClick={() => {
            setCasesType('recovered');
          }} classes="box__recovered"
            title={`Today cases recovered in ${countryInfo.country ? countryInfo.country : "worldwide"} `}
            cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

          <InfoBox active={casesType === 'deaths'} onClick={() => {
            setCasesType('deaths');
          }} classes="box__deaths"
            title={`Today cases deaths in ${countryInfo.country ? countryInfo.country : "worldwide"}`}
            cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <Map mapCountries={mapCountries} center={mapCenter} zoom={mapZoom} casesType={casesType} />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>
              Live Cases by Country
            </h3>
            <Table countries={tableData} />
            <h3>
              New Cases
            </h3>
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

export default App;
