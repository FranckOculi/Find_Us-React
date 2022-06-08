import React from 'react';
import Logo from '../Other/Logo';
import LayoutMaterial from '../../UI/Layout/LayoutMaterial';

const Header = () => {
  const { HeaderPaper } = LayoutMaterial();
  return (
    <div className='header'>
      <HeaderPaper>
        <Logo />
      </HeaderPaper>
    </div>
  );
};

export default Header;
