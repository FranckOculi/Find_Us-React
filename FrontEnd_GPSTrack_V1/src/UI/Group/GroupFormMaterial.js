import React from 'react';
import { Box, Avatar, Typography, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import AppTheme from '../../theme/AppTheme';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { styled } from '@mui/material/styles';

const GroupFormMaterial = () => {
  const { getTheme } = AppTheme();
  const theme = getTheme('GroupForm');

  const GroupFormPaper = ({ className, children }) => {
    return (
      <Paper className={className} elevation={0}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 355,
            height: 50,
            alignItems: 'center',
          }}
        >
          {children}
        </Box>
      </Paper>
    );
  };

  const GroupFormAppbar = ({ onClick, title, subTitle }) => {
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
            <Typography variant='body2' component='div' sx={{ fontSize: 14 }}>
              {subTitle}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    );
  };

  const GroupFormAvatar = () => {
    return (
      <Avatar
        sx={{
          display: 'flex',
          mt: 10,
          bgcolor: 'primary',
        }}
      >
        <AddAPhotoIcon></AddAPhotoIcon>
      </Avatar>
    );
  };

  const DivForm = ({ children }) => {
    const Div = styled('div')(({ theme }) => ({
      ...theme.typography.string,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
    }));
    return (
      <Div sx={{ mt: 1, width: '250px', textAlign: 'center' }}>{children}</Div>
    );
  };

  const CustomButton = ({ onClick, children }) => {
    return (
      <Button type='submit' variant='contained' size='medium' sx={{ mt: 5 }}>
        {children}
      </Button>
    );
  };

  const CustomButtonDisabled = ({ children }) => {
    return (
      <Button variant='contained' size='medium' sx={{ mt: 5 }} disabled>
        {children}
      </Button>
    );
  };

  return {
    GroupFormPaper,
    GroupFormAppbar,
    GroupFormAvatar,
    DivForm,
    CustomButton,
    CustomButtonDisabled,
  };
};
export default GroupFormMaterial;
