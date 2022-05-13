import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';

const Footer = () => {
  const borderStyle = () => {
    return 'solid lightGray';
  };
  const location = useLocation();
  return (
    <div className='footer'>
      <Paper sx={{ bottom: 0, left: 0, right: 0, width: 375 }} elevation={3}>
        <BottomNavigation>
          <BottomNavigationAction
            label='Favorites'
            icon={
              <HomeIcon
                sx={{ fontSize: 30 }}
                color={location.pathname === '/' ? 'primary' : ''}
              />
            }
            component={Link}
            to='/'
          />
          <BottomNavigationAction
            label='Home'
            icon={
              <LocationOnIcon
                sx={{ fontSize: 30 }}
                color={location.pathname === '/map' ? 'primary' : ''}
              />
            }
            component={Link}
            to='/map'
          />
          <BottomNavigationAction
            label='Archive'
            icon={
              <MenuIcon
                sx={{ fontSize: 30 }}
                color={location.pathname === '/settings' ? 'primary' : ''}
              />
            }
            component={Link}
            to='/settings'
          />
        </BottomNavigation>
      </Paper>
    </div>
    // <div className='footer'>
    //   {/* <BottomNavigation sx={{ width: 375 }}> */}
    //   <Link
    //     to='/'
    //     className='link'
    //     style={{
    //       borderRight: '1px solid lightGray',
    //     }}
    //   >
    //     <HomeIcon
    //       sx={{ fontSize: 40 }}
    //       color={location.pathname === '/' ? 'primary' : ''}
    //     />
    //   </Link>
    //   <Link to='/map' className='link'>
    //     <LocationOnIcon color={location.pathname === '/map' ? 'primary' : ''} />
    //   </Link>
    //   <Link to='/inviting' className='link'>
    //     Inviting
    //   </Link>
    //   <Link
    //     to='/settings'
    //     className='link'
    //     id={location.pathname === '/settings' ? 'active' : ''}
    //   >
    //     Settings
    //   </Link>
    //   {/* </BottomNavigation> */}
    // </div>
  );
};

export default Footer;
