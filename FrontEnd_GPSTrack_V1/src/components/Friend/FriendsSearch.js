import React, { useEffect, useState } from 'react';
import UseFriends from '../../hooks/UseFriends';
import Loader from '../Other/Loader';
import { isEmpty } from '../../utils/Utils';

const FriendsSearch = ({
  searchModalChange,
  handleAddMembers,
  eventSearchData,
  userData,
  handleSendInvitation,
}) => {
  const [isLoad, setIsLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { friendsData, loadFriendsData, loadFriendsNameData } = UseFriends();

  const handleSearchTerm = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
  };

  const fetchFriendsData = async () => {
    await loadFriendsData(userData.utilisateurId).then((res) =>
      loadFriendsNameData(res),
    );
  };

  useEffect(() => {
    if (!isLoad & isEmpty(friendsData)) {
      fetchFriendsData();
      setIsLoad(true);
    }
  }, []);

  return (
    <>
      {isEmpty(friendsData) && <Loader />}
      {!isEmpty(friendsData) && (
        <>
          <input
            id='searchBar'
            type='text'
            name='searchBar'
            placeholder='Search friends...'
            onChange={handleSearchTerm}
          ></input>
          <button id='searchBarBtnBack' onClick={searchModalChange}>
            Back
          </button>
          <button id='searchBarBtnAdd' onClick={handleAddMembers}>
            Add
          </button>
        </>
      )}
      {!isEmpty(friendsData) &&
        friendsData
          .filter((friend) => {
            return friend.prenom
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          })
          .map((friend) => (
            <div
              className='friendsItem'
              key={friend.utilisateurId}
              onClick={() => {
                eventSearchData(friend);
                handleSendInvitation(friend.utilisateurId, friend.prenom);
              }}
            >
              {friend.prenom}
            </div>
          ))}
    </>
  );
};

export default FriendsSearch;
