import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsMaterial from '../../UI/Settings/SettingsMaterial';
import UserInfos from '../../hooks/UserInfos';
import AppAvatar from '../../UI/Group/AppAvatar';
import { deleteUser } from '../../services/UserApi';
import Token from '../../services/Token';
import UseAuth from '../../hooks/UseAuth';
import Loader from '../Other/Loader';

const SettingsComponent = () => {
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);
  const { userId, userData } = UserInfos();
  const { Title, UserCard, LinkCard, DividerLine, Logout } = SettingsMaterial();
  const { SettingsPhotoMember, SettingsLogoMemberDefault } = AppAvatar();

  const { logout } = UseAuth();

  //Logout
  const handleLogout = async () => {
    setIsLogout(true);
    Token.removeToken();
    logout();
    setTimeout(() => {
      navigate('/auth', { replace: true });
    }, 400);
  };

  //Delete user
  const handleDelete = async () => {
    await deleteUser(userId).then(handleLogout());
  };

  if (isLogout) {
    return <Loader />;
  }
  return (
    <div className='settingsContainer'>
      <Title title='SETTINGS' />
      <UserCard
        avatar={
          userData && userData.photoProfil
            ? SettingsPhotoMember(userData)
            : SettingsLogoMemberDefault(userData)
        }
        title={userData && userData.pseudo}
        subheader={userData?.numeroTelephone && 0 + userData.numeroTelephone}
      />
      <DividerLine />
      <LinkCard
        title={'Account'}
        subheader={'Profil, Blocked users, Delete account'}
      />
      <LinkCard
        title={'Privacy Policy'}
        subheader={'Privacy policy, Data protection'}
      />
      <LinkCard
        title={'Terms of Service'}
        subheader={'Terms, Help center, Contact us'}
      />
      <DividerLine />
      <Logout id='logout' title='Logout' onClick={handleLogout} />
    </div>
  );
};

export default SettingsComponent;
