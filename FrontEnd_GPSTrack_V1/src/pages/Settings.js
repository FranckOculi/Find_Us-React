import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import SettingComponent from '../components/Settings/SettingsComponent';

const Settings = () => {
  return (
    <div className='settings'>
      <Header />
      <SettingComponent />
      <Footer />
    </div>
  );
};

export default Settings;
