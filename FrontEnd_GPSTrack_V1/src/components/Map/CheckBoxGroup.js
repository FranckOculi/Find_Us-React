import React, { useState } from 'react';
import UseGroups from '../../hooks/UseGroups';
import UserInfos from '../../hooks/UserInfos';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

const Checkbox = ({ id, type, name, handleClick, isChecked }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

const Switch = ({ id, type, name, handleClick, isChecked }) => {
  return (
    <label className='switch'>
      <input
        id={id}
        name={name}
        type={type}
        onChange={handleClick}
        checked={isChecked}
      />
      <span className='slider round'></span>
    </label>
  );
};

const CheckBoxGroup = () => {
  const { allMembersData, groupsData } = UseGroups();
  const { userData } = UserInfos();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(groupsData.map((group) => group.codeGroupe));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const photo = (group) => {
    return (
      <Avatar
        sx={{ bgcolor: 'black', width: 24, height: 24, fontSize: 'small' }}
        aria-label='recipe'
      >
        <img
          src={group.photoGroupe}
          alt='GroupPhoto'
          style={{ width: 24, height: 24 }}
        ></img>
      </Avatar>
    );
  };

  const logoDefault = (group) => {
    return (
      <Avatar
        sx={{ bgcolor: red[500], width: 24, height: 24, fontSize: 'small' }}
        aria-label='recipe'
      >
        {group.nomGroupe.slice(0, 1).toUpperCase()}
      </Avatar>
    );
  };

  const photoMember = (member) => {
    return (
      <Avatar
        sx={{ bgcolor: 'black', width: 24, height: 24 }}
        aria-label='recipe'
      >
        <img
          src={member.photoProfil}
          alt='memberPhoto'
          style={{ scale: 1 }}
        ></img>
      </Avatar>
    );
  };

  const logoMemberDefault = (member) => {
    return (
      <Avatar
        sx={{ bgcolor: '#03a9f4', width: 24, height: 24 }}
        aria-label='recipe'
      >
        {member.pseudo.slice(0, 1).toUpperCase()}
      </Avatar>
    );
  };

  const catalog = groupsData.map((group) => (
    <CardHeader
      key={group.codeGroupe}
      sx={{ mt: 0, mb: -2, ml: 2 }}
      avatar={group.photoGroupe ? photo(group) : logoDefault(group)}
      title={group.nomGroupe}
      action={
        <Switch
          type='checkbox'
          name={group.nomGroupe}
          id={group.codeGroupe}
          handleClick={handleClick}
          isChecked={isCheck.includes(group.codeGroupe)}
        />
      }
    />
  ));

  return (
    <>
      {catalog}
      <CardHeader
        subheader={'Select all'}
        action={
          <Switch
            type='checkbox'
            name='selectAll'
            id='selectAll'
            handleClick={handleSelectAll}
            isChecked={isCheckAll}
            sx={{ mr: 15 }}
          />
        }
        sx={{ ml: 17 }}
      />
    </>
  );
};

export default CheckBoxGroup;
