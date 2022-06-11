import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import GroupsPosition from './GroupsPosition';
import Loader from '../other/Loader';
import UsePosition from '../../hooks/UsePosition';
import MapMaterial from '../../ui/map/MapMaterial';
import UserInfos from '../../hooks/UserInfos';

const MapComponent = ({ mapLoaded }) => {
  const isMounted = useRef(true);
  const [loadPage, setLoadPage] = useState(false);
  const [reload, setReload] = useState(false);
  const refreshDelay = 5000;
  let zoom = 15;
  const {
    loadCurrentPosition,
    currentPosition,
    getLastPosition,
    savePosition,
  } = UsePosition();
  const { userData } = UserInfos;
  const { UserMarker } = MapMaterial();

  //user position
  const getPosition = () => {
    try {
      navigator.geolocation.getCurrentPosition((res) => {
        if (isMounted.current) {
          loadCurrentPosition({
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
          });
          mapLoaded(true);
        }
      });
      if (!loadPage) {
        // savePosition();
        setLoadPage(true);
        return refresh();
      } else {
        if (
          userData &&
          getLastPosition(userData.utilisateurId) !== currentPosition
        ) {
          // savePosition(userData.utilisateurId, currentPosition);
        }
        setTimeout(() => {
          return refresh();
        }, refreshDelay);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Refresh positions
  function refresh() {
    setTimeout(() => {
      setReload(!reload);
      isMounted.current = true;
    }, refreshDelay);
  }

  useEffect(() => {
    if (!loadPage) {
      getPosition();
    }
    if (loadPage) {
      getPosition();
    }

    return () => (isMounted.current = false);
  }, [reload]);

  if (!currentPosition?.latitude && !currentPosition?.longitude) {
    return <Loader />;
  }

  return (
    <MapContainer
      center={[currentPosition.latitude, currentPosition.longitude]}
      zoom={zoom}
    >
      <TileLayer
        attribution={process.env.REACT_APP_API_ENDPOINT}
        url={process.env.REACT_APP_API_URL}
      />
      <GroupsPosition />
      <UserMarker
        position={[currentPosition.latitude, currentPosition.longitude]}
      >
        <Popup>You</Popup>
      </UserMarker>
    </MapContainer>
  );
};

export default MapComponent;
