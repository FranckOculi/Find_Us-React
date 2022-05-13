import React from 'react';
import UseFriends from '../../hooks/UseFriends';
import UserInfos from '../../hooks/UserInfos';

import { isEmpty } from '../../utils/Utils';

const Friends = () => {
  const { friendsData, loadFriendsData, loadFriendsNameData } = UseFriends();
  const { userData } = UserInfos();

  const handleLoadFriendsData = async () => {
    await loadFriendsData(userData.utilisateurId).then((res) =>
      loadFriendsNameData(res),
    );
  };

  return (
    <div>
      {!isEmpty(userData) & isEmpty(friendsData) ? (
        <button onClick={handleLoadFriendsData}>load friends</button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Friends;
