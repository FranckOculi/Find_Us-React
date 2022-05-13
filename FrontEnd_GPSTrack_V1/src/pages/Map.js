import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import Loader from '../components/Other/Loader';
import UseEvents from '../hooks/UseEvents';
import { isEmpty } from '../utils/Utils';
import UsePosition from '../hooks/UsePosition';
import UseGroups from '../hooks/UseGroups';
import UserInfos from '../hooks/UserInfos';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Map = () => {
  const isMounted = useRef(true);
  const [loadPage, setLoadPage] = useState(false);
  const [reload, setReload] = useState(false);
  const refreshDelay = 5000;
  const { eventMembers } = UseEvents();
  const { currentPosition, getFriendsCurrentPosition, loadCurrentPosition } =
    UsePosition();
  const { groupsData, loadGroup, membersData, loadAllMembers, allMembersData } =
    UseGroups();
  const { userData } = UserInfos();
  const API_ENDPOINT =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const API_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  let zoom = 15;

  const [expandedGroup, setExpandedGroup] = React.useState(false);
  const [expandedMember, setExpandedMember] = React.useState(false);
  const handleExpandClickGroup = () => {
    setExpandedGroup(!expandedGroup);
  };
  const handleExpandClickMember = () => {
    setExpandedMember(!expandedMember);
  };

  //user position
  const getPosition = () => {
    try {
      navigator.geolocation.getCurrentPosition((res) => {
        if (isMounted.current) {
          loadCurrentPosition({
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
          });
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
  const getFriendPosition = () => getFriendsCurrentPosition(eventMembers);

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
      getFriendPosition();
      loadAllMembers(userData.utilisateurId, groupsData);
    }
    if (loadPage) getPosition();
    return () => (isMounted.current = false);
  }, [reload]);

  if (!currentPosition?.latitude && !currentPosition?.longitude) {
    return (
      <div className='map'>
        <Header />
        <Loader />
        <Footer />
      </div>
    );
  }
  const photo = (group) => {
    return (
      <Avatar
        sx={{ bgcolor: 'black', width: 24, height: 24, fontSize: 'small' }}
        aria-label='recipe'
      >
        <img
          src={group.photoGroupe}
          alt='GroupPhoto'
          style={{ width: 24, height: 24 }}
        ></img>
      </Avatar>
    );
  };

  const logoDefault = (group) => {
    return (
      <Avatar
        sx={{ bgcolor: red[500], width: 24, height: 24, fontSize: 'small' }}
        aria-label='recipe'
      >
        {group.nomGroupe.slice(0, 1).toUpperCase()}
      </Avatar>
    );
  };

  const photoMember = (member) => {
    return (
      <Avatar
        sx={{ bgcolor: 'black', width: 24, height: 24 }}
        aria-label='recipe'
      >
        <img
          src={member.photoProfil}
          alt='memberPhoto'
          style={{ scale: 1 }}
        ></img>
      </Avatar>
    );
  };

  const logoMemberDefault = (member) => {
    return (
      <Avatar
        sx={{ bgcolor: '#03a9f4', width: 24, height: 24 }}
        aria-label='recipe'
      >
        {member.pseudo.slice(0, 1).toUpperCase()}
      </Avatar>
    );
  };

  return (
    <div className='map'>
      <Header />
      <Card
        sx={{
          position: 'absolute',
          width: 375,
          top: 35,
          left: 0,
          zIndex: 5,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
      >
        <CardHeader
          action={
            <ExpandMore
              expand={expandedGroup}
              onClick={handleExpandClickGroup}
              aria-expanded={expandedGroup}
              aria-label='show more'
              sx={{ mr: 2 }}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          }
          subheader={'Groups: All'}
          sx={{ mt: -2.5, ml: 3, mb: -2.5, textAlign: 'center' }}
        />
        <Collapse in={expandedGroup} timeout='auto' unmountOnExit height={500}>
          {groupsData &&
            groupsData.map((group) => (
              <CardHeader
                key={group.codeGroupe}
                sx={{ mt: 0, mb: -2, ml: 2 }}
                avatar={group.photoGroupe ? photo(group) : logoDefault(group)}
                title={group.nomGroupe}
                action={<Switch {...label} defaultChecked sx={{ mr: 2 }} />}
              />
            ))}
          <CardHeader
            subheader={'All'}
            action={<Switch {...label} defaultChecked sx={{ mr: 15 }} />}
            sx={{ ml: 17 }}
          />
        </Collapse>
      </Card>

      <Card
        sx={{
          position: 'absolute',
          width: 375,
          bottom: 58,
          left: 0,
          zIndex: 5,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <CardHeader
          action={
            <ExpandMore
              expand={expandedMember}
              onClick={handleExpandClickMember}
              aria-expanded={expandedMember}
              aria-label='show more'
              sx={{ mr: 2 }}
            >
              <ExpandLessIcon />
            </ExpandMore>
          }
          subheader={'Members: All'}
          sx={{ mt: -2.5, ml: 3, mb: -2.5, textAlign: 'center' }}
        />
        <Collapse in={expandedMember} timeout='auto' unmountOnExit height={500}>
          {/* {allMembersData &&
            allMembersData.map((member) => (
              <CardHeader
                key={member.utilisateurId}
                sx={{ mt: 0, mb: -2, ml: 2 }}
                avatar={
                  member.photoProfil
                    ? photoMember(member)
                    : logoMemberDefault(member)
                }
                title={member.nom}
                action={<Switch {...label} defaultChecked sx={{ mr: 2 }} />}
              />
            ))} */}

          <CardHeader
            subheader={'All'}
            action={<Switch {...label} defaultChecked sx={{ mr: 15 }} />}
            sx={{ ml: 17 }}
          />
        </Collapse>
      </Card>
      <MapContainer
        center={[currentPosition.latitude, currentPosition.longitude]}
        zoom={zoom}
      >
        <TileLayer attribution={API_ENDPOINT} url={API_URL} />
        {!isEmpty(eventMembers) &&
          eventMembers.map(
            (member) =>
              !isEmpty(member.position) && (
                <Marker
                  key={member.utilisateurId}
                  position={[
                    member.position.latitude,
                    member.position.longitude,
                  ]}
                >
                  <Popup>{member.prenom}</Popup>
                </Marker>
              ),
          )}
        <Marker
          position={[currentPosition.latitude, currentPosition.longitude]}
        >
          <Popup>You</Popup>
        </Marker>
      </MapContainer>
      <Footer />
    </div>
  );
};

export default Map;
