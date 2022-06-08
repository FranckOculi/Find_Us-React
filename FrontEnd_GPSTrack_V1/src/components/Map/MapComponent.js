import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import Loader from '../Other/Loader';
import UsePosition from '../../hooks/UsePosition';
import { isEmpty } from '../../utils/Utils';

const MapComponent = ({ mapLoaded }) => {
  const isMounted = useRef(true);
  const [loadPage, setLoadPage] = useState(false);
  const [reload, setReload] = useState(false);
  const refreshDelay = 5000;
  const { currentPosition, getFriendsCurrentPosition, loadCurrentPosition } =
    UsePosition();
  const API_ENDPOINT =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const API_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  let zoom = 15;

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
        setLoadPage(true);
        return refresh();
      } else {
        setTimeout(() => {
          return refresh();
        }, refreshDelay);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Friends position
  // const getFriendPosition = () => getFriendsCurrentPosition(eventMembers);

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
      // getFriendPosition();
    }
    if (loadPage) getPosition();
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
      <TileLayer attribution={API_ENDPOINT} url={API_URL} />
      {/* {!isEmpty(eventMembers) &&
        eventMembers.map(
          (member) =>
            !isEmpty(member.position) && (
              <Marker
                key={member.utilisateurId}
                position={[member.position.latitude, member.position.longitude]}
              >
                <Popup>{member.prenom}</Popup>
              </Marker>
            ),
        )} */}
      <Marker position={[currentPosition.latitude, currentPosition.longitude]}>
        <Popup>You</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
