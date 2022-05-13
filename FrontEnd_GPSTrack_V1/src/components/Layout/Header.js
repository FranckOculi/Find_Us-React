import React from 'react';
import Logo from '../Other/Logo';
import Paper from '@mui/material/Paper';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <div className='header'>
      <Paper sx={{ bottom: 0, left: 0, right: 0, width: 375 }} elevation={0}>
        <Logo />
      </Paper>
    </div>
  );
};

export default Header;
