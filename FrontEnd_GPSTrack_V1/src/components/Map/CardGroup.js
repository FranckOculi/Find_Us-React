import React from 'react';
import UseGroups from '../../hooks/UseGroups';
import CheckBoxMember from '../../ui/map/CheckBoxMember';
import MapMaterial from '../../ui/map/MapMaterial';
import AppAvatar from '../../ui/group/AppAvatar';
const CardGroup = () => {
  const { groupsData, selectedGroup } = UseGroups();
  const { SelectGroupCard } = MapMaterial();
  const { MapPhoto, MapLogoDefault, MapPhotoMember, MapLogoMemberDefault } =
    AppAvatar();

  return (
    <SelectGroupCard>
      {groupsData &&
        groupsData.map((group) => {
          if (group.codeGroupe === selectedGroup) {
            return (
              <CheckBoxMember
                group={group}
                MapPhoto={MapPhoto}
                MapLogoDefault={MapLogoDefault}
                MapPhotoMember={MapPhotoMember}
                MapLogoMemberDefault={MapLogoMemberDefault}
                key={group.codeGroupe}
              />
            );
          }
        })}
    </SelectGroupCard>
  );
};

export default CardGroup;
