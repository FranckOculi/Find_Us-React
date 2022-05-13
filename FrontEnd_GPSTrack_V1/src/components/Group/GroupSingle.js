import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import UseGroups from '../../hooks/UseGroups';
import UserInfos from '../../hooks/UserInfos';
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
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import GroupSingleTheme from '../../utils/GroupSingleTheme';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { dateParser } from '../../utils/Utils';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Loader from '../Other/Loader';

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

const GroupSingle = () => {
  const [expandedDescription, setExpandedDescription] = useState(true);
  const [expandedMember, setExpandedMember] = useState(true);

  const handleExpandDescription = () => {
    setExpandedDescription(!expandedDescription);
  };

  const handleExpandMember = () => {
    setExpandedMember(!expandedMember);
  };

  const handleAddMember = () => {
    console.log('hello');
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = createTheme(GroupSingleTheme.getTheme());
  const Div = GroupSingleTheme.getDiv();
  const navigate = useNavigate();
  let params = useParams();
  const [isLoad, setIsLoad] = useState(false);
  const { findGroup, findMember, membersData, removeGroup, refreshMember } =
    UseGroups();
  const [dataSingle, setDataSingle] = useState([]);
  const { userData } = UserInfos();

  const photoGroup = () => {
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

  const logoGroupDefault = () => {
    return (
      <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
        {dataSingle.nomGroupe.slice(0, 1).toUpperCase()}
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

  const handleBackToHome = () => {
    refreshMember(userData.utilisateurId);
    return navigate('/', { replace: true });
  };

  const loadGroup = async () => {
    await findMember(userData.utilisateurId, params.codeGroup);
    await findGroup(params.codeGroup).then((res) => {
      setDataSingle(res);
    });
  };

  const handleGoBack = () => {
    return navigate('/', { replace: true });
  };

  const handleDelete = async () => {
    if (anchorEl) {
      await removeGroup(userData.utilisateurId, dataSingle.codeGroupe).then(
        () => handleGoBack(),
      );
    }
  };

  useEffect(() => {
    if (!isLoad) {
      loadGroup();
      setIsLoad(!isLoad);
    }
  }, []);

  if (dataSingle?.codeGroupe) {
    return (
      <>
        <AppBar position='static'>
          <Toolbar onClick={handleBackToHome}>
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
                {dataSingle.nomGroupe}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Card sx={{ width: 345, height: 550, mt: 5, overflow: 'scroll' }}>
          <CardHeader
            avatar={dataSingle.photoGroupe ? photoGroup() : logoGroupDefault()}
            action={
              <IconButton aria-label='settings' onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            }
            title={dataSingle.nomGroupe}
            subheader={dateParser(dataSingle.dateGroupe)}
          />
          <div></div>
          <CardActions disableSpacing>
            <CardHeader subheader={'Description: '} sx={{ ml: -1 }} />
            <ExpandMore
              expand={expandedDescription}
              onClick={handleExpandDescription}
              aria-expanded={expandedDescription}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expandedDescription} timeout='auto' unmountOnExit>
            {dataSingle.description ? (
              <CardHeader
                sx={{ mt: -4 }}
                subheader={
                  // 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ipsam labore velit sed. Reprehenderit modi voluptates vitae doloribus quis maiores veritatis velit et!'
                  dataSingle.description
                }
                subheaderTypographyProps={{
                  fontSize: '13px',
                  align: 'justify',
                }}
              />
            ) : (
              <Paper elevation={1} sx={{ ml: 2, mr: 2, mt: -1 }}>
                <EditIcon></EditIcon>
                ...
              </Paper>
            )}
          </Collapse>

          <CardActions disableSpacing>
            <CardHeader subheader={'Members: '} sx={{ ml: -1, mt: -2 }} />
            <ExpandMore
              expand={expandedMember}
              onClick={handleExpandMember}
              aria-expanded={expandedMember}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expandedMember} timeout='auto' unmountOnExit>
            <CardContent sx={{ mt: -1, ml: -1.8, mb: 1, height: 70 }}>
              {membersData ? (
                membersData.map((member) => (
                  <CardHeader
                    key={member.utilisateurId}
                    sx={{ mt: -4, mb: 1 }}
                    avatar={
                      member.photoProfil
                        ? photoMember(member)
                        : logoMemberDefault(member)
                    }
                    subheader={member.nom}
                    action={
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ fontSize: '13px', mt: 0.8, mr: 1.5 }}
                      >
                        {member.admin === 'true' && 'admin'}
                      </Typography>
                    }
                  />
                ))
              ) : (
                <PersonAddIcon
                  color='primary'
                  sx={{ mt: -1, ml: 20 }}
                ></PersonAddIcon>
              )}

              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: '#03a9f4',
                        width: 24,
                        height: 24,
                        mt: -4,
                        ml: 5,
                      }}
                      aria-label='recipe'
                    >
                      +
                    </Avatar>
                  }
                  onClick={handleAddMember}
                ></CardHeader>

                <CardHeader
                  subheader={'Add member'}
                  color='#03a9f4'
                  sx={{ mt: -5, ml: 3 }}
                  onClick={handleAddMember}
                ></CardHeader>
              </CardContent>
            </CardContent>
          </Collapse>
        </Card>
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
          {dataSingle.photoGroupe ? (
            <MenuItem>
              {photoGroup()}
              Edit photo
            </MenuItem>
          ) : (
            <MenuItem>
              {logoGroupDefault()}
              Edit photo
            </MenuItem>
          )}
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize='small' />
            </ListItemIcon>
            Add another member
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            Settings
          </MenuItem>
          {/* <MenuItem onClick={handleDelete()}> */}
          <MenuItem onClick={(e) => handleDelete(e)}>
            <ListItemIcon>
              <DeleteForeverIcon fontSize='small' />
            </ListItemIcon>
            Delete group
          </MenuItem>
        </Menu>
      </>
    );
  }

  if (isLoad & !dataSingle) return null;

  return <Loader />;
};

export default GroupSingle;
