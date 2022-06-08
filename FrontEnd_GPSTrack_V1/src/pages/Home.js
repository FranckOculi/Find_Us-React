import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GroupList from '../components/group/GroupList';

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
