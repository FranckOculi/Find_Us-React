import React from 'react';
import UserInfos from '../../hooks/UserInfos';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Sequence1 = ({ setState1, setState2 }) => {
  const { userData } = UserInfos();

  const bull = (
    <Box
      component='span'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        transform: 'scale(0.8)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      •
    </Box>
  );
  return (
    <div id='sequence'>
      <Card sx={{ width: 270, height: 210 }}>
        <CardContent>
          <Typography
            variant='h5'
            component='div'
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            Welcome {userData.user.pseudo}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              display: 'flex',
              justifyContent: 'center',
              marginTop: 2,
              textAlign: 'justify',
            }}
            color='text.secondary'
            gutterBottom
          >
            The app allows you to share your GPS position with your friends.
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              display: 'flex',
              // justifyContent: 'center',
              marginTop: 1,
              textAlign: 'justify',
            }}
            color='text.secondary'
            gutterBottom
          >
            Lets start to show you how it works !
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size='small'>Learn More</Button>
        </CardActions> */}
        <Button
          variant='contained'
          size='small'
          sx={{
            display: 'inline-block',
            textAlign: 'center',
            marginTop: 1,
            marginLeft: 10.5,
            marginBottom: 2,
          }}
          onClick={() => {
            setState1(false);
            setState2(true);
          }}
        >
          Get started
        </Button>
      </Card>
      {/* <div id='sequence'>
        Welcome {userData.user.pseudo}. The app allows you to share your GPS
        position with your friends. Lets start to show you how it works !
      </div> */}
      {/* <Button
        variant='contained'
        size='small'
        onClick={() => {
          setState1(false);
          setState2(true);
        }}
      >
        Get started
      </Button> */}
    </div>
  );
};

export default Sequence1;
