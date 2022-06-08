import React from 'react';
import UseGroups from '../../hooks/UseGroups';
import CheckBoxMember from '../../ui/map/CheckBoxMember';
import MapMaterial from '../../ui/map/MapMaterial';
import AppAvatar from '../../ui/group/AppAvatar';
const CardGroup = () => {
  const { groupsData } = UseGroups();
  const { SelectGroupCard } = MapMaterial();
  const { MapPhoto, MapLogoDefault, MapPhotoMember, MapLogoMemberDefault } =
    AppAvatar();

  return (
    <SelectGroupCard>
      {groupsData &&
        groupsData.map((group) => (
          <CheckBoxMember
            group={group}
            MapPhoto={MapPhoto}
            MapLogoDefault={MapLogoDefault}
            MapPhotoMember={MapPhotoMember}
            MapLogoMemberDefault={MapLogoMemberDefault}
            key={group.codeGroupe}
          />
        ))}
    </SelectGroupCard>
  );
};

export default CardGroup;
