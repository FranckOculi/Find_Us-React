import React, { useEffect, useState } from 'react';
import UseFriends from '../../hooks/UseFriends';
import Loader from '../Other/Loader';
import { isEmpty } from '../../utils/Utils';

import FriendsSearchMaterial from '../../UI/Friend/FriendsSearchMaterial';

const FriendsSearch = ({ userData, handleAddMember, handleAddMemberModal }) => {
  const [isLoad, setIsLoad] = useState(false);
  const { friendsId, friendsData, loadFriendsData } = UseFriends();
  const { InputSearch, FriendSearchBar } = FriendsSearchMaterial();

  const fetchFriendsData = async () => {
    return await loadFriendsData(friendsId, userData.utilisateurId);
  };

  useEffect(() => {
    if (!isLoad & isEmpty(friendsData)) {
      fetchFriendsData();
      setIsLoad(true);
    }
  }, []);

  const handleBackToGroup = () => {
    handleAddMemberModal();
  };

  if (friendsData) {
    return (
      <InputSearch
        className='friendsSearch'
        friendsData={friendsData}
        label='Add friends'
        handleAddMember={(e) => handleAddMember(e)}
      >
        <FriendSearchBar onClick={handleBackToGroup}>
          Add friends
        </FriendSearchBar>
      </InputSearch>
    );
  }
  return <Loader />;
};

export default FriendsSearch;
