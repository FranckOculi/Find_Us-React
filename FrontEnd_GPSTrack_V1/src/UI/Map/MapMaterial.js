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
          subheader={'Groups'}
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

  const CustomMarker = ({ position, children }) => {
    function getIcon(_iconSize) {
      return L.icon({
        iconUrl: require('../../img/logo.png'),
        iconSize: [_iconSize],
      });
    }

    return (
      <Marker position={position} icon={getIcon(20, 20)}>
        {children}
      </Marker>
    );
  };

  return { SelectGroupCard, CustomMarker };
};

export default MapMaterial;
