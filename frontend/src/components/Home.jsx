import React, { useState, useRef } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import OsmProviders from "./OsmProviders";

function Home() {
  const markerIcon = new Leaflet.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -45]
  })
  const [center, setCenter] = useState({
    lat: 51.505,
    lng: -0.09,
  })
  const ZOOM_LEVEL = 13;
  const mapRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const getIpInfoOnBtnClick = async () => {
    let url = `http://localhost:3080/ip-info/${inputValue}`;
    let response = await axios.get(url);
    console.log(response.data.result);
    setData(response.data.result);
    const {
      lat,
      lng
    } = response.data.result.location;
    setCenter({ lat, lng })
  };

  return (
    <>
      <header>
        <h1>IP Address Tracker</h1>
        <div>
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            value={inputValue}
            onChange={(e) => {
              return setInputValue(e.target.value);
            }}
          />
          <p className="my-btn" onClick={getIpInfoOnBtnClick}>
            &gt;
          </p>
        </div>
      </header>
      <section className="main-section">
        <div className="info-section">
          <div className="ip-address-section info-section-div">
            <p className="title">IP ADDRESS</p>
            <p className="description">{data?.ip}</p>
          </div>
          <div className="location-section info-section-div">
            <p className="title">LOCATION</p>
            <p className="description">{data?.location ? `${data?.location.region},  ${data?.location.postalCode}` : ""}</p>
          </div>
          <div className="timezone-section info-section-div">
            <p className="title">TIMEZONE</p>

            <p className="description">{data?.location ? `UTC ${data?.location.timezone || ""}` : ""}</p>

          </div>
          <div className="isp-section">
            <p className="title">ISP</p>
            <p className="description">{data?.isp}</p>
          </div>
        </div>
      </section>
      <section className="map-section">
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL}
          className="my-map"
          ref={mapRef}
        >
          <TileLayer url={OsmProviders.maptiler.url} attribution={OsmProviders.maptiler.attribution} />
          <Marker position={center} icon={markerIcon}>
            <Popup>
              <p>{data?.location ? `${data?.location.region},  Lat: ${data?.location.lat}, Lng: ${data?.location.lng}` : ""}</p>
            </Popup>
          </Marker>
        </MapContainer>
      </section>
    </>
  );
}

export default Home;
