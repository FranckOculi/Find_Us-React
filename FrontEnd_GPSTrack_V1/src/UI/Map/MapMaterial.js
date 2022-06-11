import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

const MapMaterial = () => {
  const [expandedMember, setExpandedMember] = useState(false);
  const handleExpandClickMember = () => {
    setExpandedMember(!expandedMember);
  };
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

  const SelectGroupCard = ({ children }) => {
    return (
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
              sx={{ mr: 0 }}
            >
              <ExpandLessIcon />
            </ExpandMore>
          }
          subheader={'Members'}
          sx={{ mt: -2.5, ml: 3, mb: -2.5, textAlign: 'center' }}
        />
        <Collapse
          in={expandedMember}
          timeout='auto'
          unmountOnExit
          sx={{ maxHeight: '400px', overflow: 'scroll' }}
        >
          {children}
        </Collapse>
      </Card>
    );
  };

  const UserMarker = ({ position, children }) => {
    const icon = require('../../img/icon/userMarker.png');
    return (
      <Marker
        position={position}
        icon={L.icon({
          iconUrl: icon,
          iconSize: 50,
        })}
      >
        {children}
      </Marker>
    );
  };

  const MembersMarker = ({ position, children }) => {
    const icon = require('../../img/icon/membersMarker.png');

    return (
      <Marker
        position={position}
        icon={L.icon({
          iconUrl: icon,
          iconSize: 45,
        })}
      >
        {children}
      </Marker>
    );
  };

  return { SelectGroupCard, UserMarker, MembersMarker };
};

export default MapMaterial;
