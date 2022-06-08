import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SettingComponent from '../components/settings/SettingsComponent';

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
