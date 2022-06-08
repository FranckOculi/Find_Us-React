import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { Link } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import SecurityIcon from '@mui/icons-material/Security';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SettingsMaterial = () => {
  const Title = () => {
    return (
      <CardHeader
        title={'SETTINGS'}
        sx={{ mb: 2, alignSelf: 'center', fontSize: 'small' }}
        fontSize={'small'}
        id='settings-title'
      />
    );
  };

  const UserCard = ({ avatar, title, subheader }) => {
    return (
      <>
        <CardHeader avatar={avatar} title={title} subheader={subheader} />
      </>
    );
  };

  const LinkCard = ({ title, subheader }) => {
    if (title === 'Account') {
      return (
        <CardHeader
          avatar={<KeyIcon />}
          title={title}
          subheader={subheader}
          sx={{ mb: 1 }}
        />
      );
    } else if (title === 'Privacy Policy') {
      return (
        <CardHeader
          avatar={<SecurityIcon />}
          title={title}
          subheader={subheader}
          sx={{ mb: 1 }}
        />
      );
    } else if (title === 'Terms of Service') {
      return (
        <CardHeader
          avatar={<AssignmentIcon />}
          title={title}
          subheader={subheader}
          sx={{ mb: 1 }}
        />
      );
    }
  };

  const DividerLine = () => {
    return <Divider sx={{ mb: 2 }} />;
  };

  const Logout = ({ id, title, onClick }) => {
    return (
      <CardHeader
        avatar={<LogoutIcon />}
        title={<Link id={id}>{title}</Link>}
        onClick={onClick}
      />
    );
  };
  return { Title, UserCard, LinkCard, DividerLine, Logout };
};

export default SettingsMaterial;
