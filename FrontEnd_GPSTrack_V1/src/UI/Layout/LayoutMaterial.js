import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';

const LayoutMaterial = () => {
  const HeaderPaper = ({ children }) => {
    return (
      <Paper sx={{ bottom: 0, left: 0, right: 0, width: 375 }} elevation={0}>
        {children}
      </Paper>
    );
  };

  const FooterPaper = ({ children }) => {
    return (
      <Paper sx={{ bottom: 0, left: 0, right: 0, width: 375 }} elevation={3}>
        <BottomNavigation>{children}</BottomNavigation>
      </Paper>
    );
  };

  const NavLink = ({ label, color }) => {
    if (label === 'Home') {
      return (
        <BottomNavigationAction
          label={label}
          icon={<HomeIcon sx={{ fontSize: 30 }} color={color} />}
          component={Link}
          to='/'
        />
      );
    } else if (label === 'Map') {
      return (
        <BottomNavigationAction
          label={label}
          icon={<LocationOnIcon sx={{ fontSize: 30 }} color={color} />}
          component={Link}
          to='/map'
        />
      );
    } else if (label === 'Settings') {
      return (
        <BottomNavigationAction
          label={label}
          icon={<MenuIcon sx={{ fontSize: 30 }} color={color} />}
          component={Link}
          to='/settings'
        />
      );
    }
  };

  return {
    HeaderPaper,
    FooterPaper,
    NavLink,
  };
};

export default LayoutMaterial;
