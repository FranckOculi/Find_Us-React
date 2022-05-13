import React, { useState, useEffect } from 'react';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import UseEvents from '../hooks/UseEvents';
import UseInvitations from '../hooks/UseInvitations';
import UserInfos from '../hooks/UserInfos';

const Inviting = () => {
  const [isLoad, setIsLoad] = useState(false);
  const { userId } = UserInfos();
  const { userInvitations, loadInvitations } = UseInvitations();

  const loadInvitationsData = async () => {
    return await loadInvitations(userId);
  };

  useEffect(() => {
    if (!isLoad) {
      loadInvitationsData();
      setIsLoad(true);
    }
  }, []);

  return (
    <div className='inviting'>
      <Header />
      <div className='invitingContainer'> Invitings</div>

      <Footer />
    </div>
  );
};

export default Inviting;
