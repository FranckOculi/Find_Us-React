import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import GroupList from '../components/Group/GroupList';

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <GroupList />
      <Footer />
    </div>
  );
};

export default Home;
