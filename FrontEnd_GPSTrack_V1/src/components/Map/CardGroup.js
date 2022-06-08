import React from 'react';
import UseGroups from '../../hooks/UseGroups';
import CheckBoxMember from '../../UI/Map/CheckBoxMember';
import MapMaterial from '../../UI/Map/MapMaterial';

const CardGroup = () => {
  const { groupsData } = UseGroups();
  const { SelectGroupCard } = MapMaterial();

  return (
    <SelectGroupCard>
      {groupsData &&
        groupsData.map((group) => (
          <CheckBoxMember group={group} key={group.codeGroupe} />
        ))}
    </SelectGroupCard>
  );
};

export default CardGroup;
