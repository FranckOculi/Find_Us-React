import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfos from '../../hooks/UserInfos';
import UseGroups from '../../hooks/UseGroups';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  createTheme,
  ThemeProvider,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import GroupFormTheme from '../../utils/GroupFormTheme';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputAdornment from '@mui/material/InputAdornment';

const GroupForm = () => {
  const theme = createTheme(GroupFormTheme.getTheme());
  const Div = GroupFormTheme.getDiv();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    return navigate('/', { replace: true });
  };
  const { userData } = UserInfos();
  const { createGroup, loadGroupsData } = UseGroups();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async (e) => {
    const data = {
      nomGroupe: name,
      description: description,
      createur: userData.utilisateurId,
    };

    e.preventDefault();
    return await createGroup(userData.utilisateurId, data)
      .then(async (res) => {
        if (!res.err) {
          const finalData = [{ groupeCode: res.data.data.codeGroupe }];
          console.log(res);
          console.log(finalData);
          await loadGroupsData(userData.utilisateurId, finalData).then(() =>
            handleBackToHome(),
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper className='groupContainerForm' elevation={0}>
      {' '}
      <Box sx={{ width: 355 }}>
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
                New group
              </Typography>
              <Typography variant='body2' component='div' sx={{ fontSize: 14 }}>
                Add subject
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Avatar
        sx={{
          display: 'flex',
          mt: 10,
          bgcolor: 'primary',
        }}
      >
        <AddAPhotoIcon></AddAPhotoIcon>
      </Avatar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 3,
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: 308,
            height: 70,
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <TextField
            id='groupName'
            name='groupName'
            label='Name'
            required
            inputProps={{
              style: theme.inputTextName,
            }}
            InputLabelProps={{
              style: theme.inputLabel,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position='end'
                  sx={{ ml: 3.6, fontSize: '10px' }}
                >
                  {25 - name.length}
                </InputAdornment>
              ),
            }}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              // setNumberLetterName();
              console.log(e.target.textLength);
            }}
          />
          <TextField
            id='groupDescription'
            name='groupDescription'
            label='Description'
            type='text'
            inputProps={{
              style: theme.inputTextDescription,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' sx={{ ml: 3, fontSize: '10px' }}>
                  {200 - description.length}
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: theme.inputLabel,
            }}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              // setNumberLetterName(e.target.value);
            }}
          />
          <Div sx={{ mt: -1 }}>
            Provide a group subject and optional group icon
          </Div>
        </ThemeProvider>
      </Box>
      {name ? (
        <div onClick={handleCreate}>{GroupFormTheme.customButton()}</div>
      ) : (
        <div onClick={handleCreate}>
          {GroupFormTheme.customButtonDisabled()}
        </div>
      )}
    </Paper>
  );
};

export default GroupForm;
