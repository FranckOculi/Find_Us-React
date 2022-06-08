import React from 'react';
import { Avatar } from '@mui/material';
import { red } from '@mui/material/colors';

const AppAvatar = () => {
  const PhotoGroup = (dataSingle) => {
    return (
      <Avatar sx={{ bgcolor: 'black' }} aria-label='recipe'>
        <img
          src={dataSingle.photoGroupe}
          alt='GroupPhoto'
          style={{ scale: 1 }}
        ></img>
      </Avatar>
    );
  };

  const LogoGroupDefault = (dataSingle) => {
    return (
      <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
        {dataSingle.nomGroupe.slice(0, 1).toUpperCase()}
      </Avatar>
    );
  };

  const PhotoMember = (member) => {
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

  const LogoMemberDefault = (member) => {
    return (
      <Avatar
        sx={{ bgcolor: '#03a9f4', width: 24, height: 24 }}
        aria-label='recipe'
      >
        {member.pseudo.slice(0, 1).toUpperCase()}
      </Avatar>
    );
  };

  const CardPhoto = (group) => {
    return (
      <Avatar sx={{ bgcolor: 'black' }} aria-label='recipe'>
        <img
          src={group.photoGroupe}
          alt='GroupPhoto'
          style={{ width: 32, height: 32 }}
        ></img>
      </Avatar>
    );
  };

  const CardLogoDefault = (group) => {
    return (
      <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
        {group.nomGroupe.slice(0, 1).toUpperCase()}
      </Avatar>
    );
  };

  const MapPhoto = (group) => {
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

  const MapLogoDefault = (group) => {
    return (
      <Avatar
        sx={{ bgcolor: red[500], width: 24, height: 24, fontSize: 'small' }}
        aria-label='recipe'
      >
        {group.nomGroupe.slice(0, 1).toUpperCase()}
      </Avatar>
    );
  };

  const MapPhotoMember = (member) => {
    return (
      <Avatar
        sx={{ bgcolor: 'black', width: 18, height: 18 }}
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

  const MapLogoMemberDefault = (member) => {
    return (
      <Avatar
        sx={{ bgcolor: '#03a9f4', width: 18, height: 18, fontSize: 'small' }}
        aria-label='recipe'
      >
        {member.pseudo.slice(0, 1).toUpperCase()}
      </Avatar>
    );
  };

  const SettingsPhotoMember = (member) => {
    return (
      <Avatar
        sx={{ bgcolor: 'black', width: 32, height: 32 }}
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

  const SettingsLogoMemberDefault = (member) => {
    return (
      <Avatar
        sx={{ bgcolor: '#03a9f4', width: 32, height: 32 }}
        aria-label='recipe'
      >
        {member.pseudo.slice(0, 1).toUpperCase()}
      </Avatar>
    );
  };

  return {
    PhotoGroup,
    LogoGroupDefault,
    PhotoMember,
    LogoMemberDefault,
    CardPhoto,
    CardLogoDefault,
    MapPhoto,
    MapLogoDefault,
    MapPhotoMember,
    MapLogoMemberDefault,
    SettingsPhotoMember,
    SettingsLogoMemberDefault,
  };
};

export default AppAvatar;
