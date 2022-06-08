import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import Loader from '../components/Other/Loader';
import { isEmpty } from '../utils/Utils';
import UsePosition from '../hooks/UsePosition';
import UseGroups from '../hooks/UseGroups';
import UserInfos from '../hooks/UserInfos';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CardGroup from '../components/Map/CardGroup';
import MapComponent from '../components/Map/MapComponent';

const Map = () => {
  const [isLoad, setIsLoad] = useState(false);
  const mapLoaded = (boolean) => {
    if (boolean) return setIsLoad(!isLoad);
  };

  return (
    <div className='map'>
      <Header />
      <MapComponent mapLoaded={mapLoaded} />
      {isLoad && <CardGroup />}
      <Footer />
    </div>
  );
};

export default Map;
