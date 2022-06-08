import React from 'react';

import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Avatar, Box, CardHeader, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const GroupListMaterial = () => {
  const NewGroupButton = ({ children, onClick }) => {
    return (
      <Button onClick={onClick} variant='contained' sx={{ mt: 3 }}>
        {children}
      </Button>
    );
  };

  const GroupListPaper = ({ children }) => {
    return (
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        elevation={0}
      >
        {children}
        <Box
          sx={{
            '& > :not(style)': {
              m: 2,
            },
          }}
        ></Box>
      </Paper>
    );
  };

  const GroupListIcon = ({ onClick, children }) => {
    return (
      <>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: 'white',
                width: 28,
                height: 28,
                mt: 4,
              }}
              aria-label='recipe'
            >
              <AddCircleIcon
                display='flex'
                color='primary'
                sx={{ fontSize: 30 }}
                onClick={onClick}
              ></AddCircleIcon>
            </Avatar>
          }
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mr: -2.1,
            padding: 0,
            zIndex: 2,
          }}
          onClick={onClick}
        ></CardHeader>
      </>
    );
  };

  const DivList = ({ children }) => {
    const Div = styled('div')(({ theme }) => ({
      ...theme.typography.string,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    }));
    return (
      <Div
        sx={{
          mt: -1,
          textAlign: 'center',
          zIndex: 1,
          color: '#1565c0',
          fontWeight: 600,
        }}
      >
        {children}
      </Div>
    );
  };

  return {
    NewGroupButton,
    GroupListPaper,
    GroupListIcon,
    DivList,
  };
};
export default GroupListMaterial;
