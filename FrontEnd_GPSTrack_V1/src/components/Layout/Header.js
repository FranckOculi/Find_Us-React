import React from 'react';
import Logo from '../other/Logo';
import LayoutMaterial from '../../ui/layout/LayoutMaterial';

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
