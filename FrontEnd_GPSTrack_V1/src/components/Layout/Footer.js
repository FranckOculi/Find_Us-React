import React from 'react';
import { useLocation } from 'react-router-dom';
import LayoutMaterial from '../../ui/layout/LayoutMaterial';

const Footer = () => {
  const location = useLocation();
  const { FooterPaper, NavLink } = LayoutMaterial();
  return (
    <div className='footer'>
      <FooterPaper>
        <NavLink
          label='Home'
          color={location.pathname === '/' ? 'primary' : ''}
        />
        <NavLink
          label='Map'
          color={location.pathname === '/map' ? 'primary' : ''}
        />
        <NavLink
          label='Settings'
          color={location.pathname === '/settings' ? 'primary' : ''}
        />
      </FooterPaper>
    </div>
  );
};

export default Footer;
