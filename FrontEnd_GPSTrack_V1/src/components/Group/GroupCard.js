import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dateParser } from '../../utils/Utils';

import GroupCardMaterial from '../../UI/Group/GroupCardMaterial';
import AppAvatar from '../../UI/Group/AppAvatar';

const GroupCard = ({ group }) => {
  const navigate = useNavigate();

  const { CardGroup, CarHeaderGroup } = GroupCardMaterial();
  const { CardPhoto, CardLogoDefault } = AppAvatar();

  const handleDisplayGroupCard = () => {
    navigate('/group/' + group.codeGroupe);
  };

  return (
    <CardGroup onClick={handleDisplayGroupCard}>
      <CarHeaderGroup
        avatar={group.photoGroupe ? CardPhoto(group) : CardLogoDefault(group)}
        title={group.nomGroupe}
        subheader={
          group.description
            ? group.description.length > 30
              ? group.description.slice(0, 32) + '...'
              : group.description
            : dateParser(group.dateGroupe)
        }
      ></CarHeaderGroup>
    </CardGroup>
  );
};

export default GroupCard;
