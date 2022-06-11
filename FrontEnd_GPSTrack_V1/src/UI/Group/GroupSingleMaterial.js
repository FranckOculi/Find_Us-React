import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  createTheme,
  ThemeProvider,
  Paper,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import GroupSingleTheme from '../../theme/GroupSingleTheme';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

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

const GroupSingleMaterial = () => {
  const GroupSingleAppbar = ({ onClick, title }) => {
    return (
      <AppBar position='static'>
        <Toolbar onClick={onClick}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <div>
            <Typography variant='h5' component='div'>
              {title}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    );
  };

  const CardSingleGroup = ({ children }) => {
    return (
      <Card sx={{ width: 345, height: 550, mt: 5, overflow: 'scroll' }}>
        {children}
      </Card>
    );
  };

  const CardHeaderSingleGroup = ({ avatar, action, title, subheader }) => {
    return (
      <CardHeader
        avatar={avatar}
        action={action}
        title={title}
        subheader={subheader}
      />
    );
  };

  const IconMenu = ({ onClick }) => {
    return (
      <IconButton aria-label='settings' onClick={onClick}>
        <MoreVertIcon />
      </IconButton>
    );
  };

  const DescriptionCard = ({ subheader, expand, onClick, expanded }) => {
    return (
      <CardActions disableSpacing>
        <CardHeader subheader={subheader} sx={{ ml: -1 }} />
        <ExpandMore
          expand={expand}
          onClick={onClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandIcon />
        </ExpandMore>
      </CardActions>
    );
  };

  const MemberCard = ({ subheader, expand, onClick, expanded }) => {
    return (
      <CardActions disableSpacing>
        <CardHeader subheader={subheader} sx={{ ml: -1, mt: -2 }} />
        <ExpandMore
          expand={expand}
          onClick={onClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandIcon />
        </ExpandMore>
      </CardActions>
    );
  };

  const ExpandIcon = () => {
    return <ExpandLessIcon />;
  };

  const CollapseGroupSingle = ({ expand, children }) => {
    return (
      <Collapse in={expand} timeout='auto' unmountOnExit>
        {children}
      </Collapse>
    );
  };

  const EditDescription = ({ subheader }) => {
    return (
      <CardHeader
        sx={{ mt: -4 }}
        subheader={subheader}
        subheaderTypographyProps={{
          fontSize: '13px',
          align: 'justify',
        }}
      />
    );
  };

  const EmptyDescription = () => {
    return (
      <Paper elevation={1} sx={{ ml: 2, mr: 2, mt: -1 }}>
        <EditIcon></EditIcon>
        ...
      </Paper>
    );
  };

  const CardContentMember = ({ children }) => {
    return (
      <CardContent sx={{ mt: -1, ml: -1.8, mb: 1, height: 70 }}>
        {children}
      </CardContent>
    );
  };

  const CardHeaderMember = ({ avatar, subheader, action }) => {
    return (
      <CardHeader
        sx={{ mt: -4, mb: 1 }}
        avatar={avatar}
        subheader={subheader}
        action={action}
      />
    );
  };

  const AdminTypography = ({ children }) => {
    return (
      <Typography
        variant='body2'
        color='text.secondary'
        sx={{ fontSize: '13px', mt: 0.8, mr: 1.5 }}
      >
        {children}
      </Typography>
    );
  };

  const AddPersonIcon = () => {
    return (
      <PersonAddIcon color='primary' sx={{ mt: -1, ml: 20 }}></PersonAddIcon>
    );
  };

  const GroupMenu = ({ photo, onClick, handleDelete }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <IconButton aria-label='settings' onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id='account-menu'
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            {photo}
            Edit photo
          </MenuItem>
          <Divider />
          <MenuItem onClick={onClick}>
            <ListItemIcon>
              <PersonAdd fontSize='small' />
            </ListItemIcon>
            Add a new member
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteForeverIcon fontSize='small' />
            </ListItemIcon>
            Delete group
          </MenuItem>
        </Menu>
      </>
    );
  };

  const GroupSingleIcon = ({ onClick, children }) => {
    const Icon = () => {
      // const icon = require('../../img/icon/seeOnMap.png');
      return (
        <img
          src='https://cdn-icons.flaticon.com/png/512/1865/premium/1865269.png?token=exp=1654938664~hmac=c283f1a0eb508536a2f284f892772158'
          alt='icon'
          width='50px'
          height='50px'
          // position='absolute'
          // bottom='25px'
          // right='120px'
        ></img>
      );
    };

    return (
      <>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: 'white',
                position: 'absolute',
                bottom: 60,
                right: 150,
                width: 70,
                height: 70,
              }}
              aria-label='recipe'
            >
              <Icon></Icon>
            </Avatar>
          }
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mr: -1.8,
            padding: 0,
            zIndex: 2,
          }}
          onClick={onClick}
        ></CardHeader>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            fontSize: '15px',
            mt: 0,
            textAlign: 'center',
            fontWeight: 500,
            position: 'absolute',
            bottom: 44,
            right: 145,
          }}
        >
          {children}
        </Typography>
      </>
    );
  };

  return {
    GroupSingleAppbar,
    CardSingleGroup,
    CardHeaderSingleGroup,
    IconMenu,
    DescriptionCard,
    MemberCard,
    ExpandIcon,
    CollapseGroupSingle,
    EditDescription,
    EmptyDescription,
    CardContentMember,
    CardHeaderMember,
    AdminTypography,
    AddPersonIcon,
    GroupMenu,
    GroupSingleIcon,
  };
};

export default GroupSingleMaterial;
