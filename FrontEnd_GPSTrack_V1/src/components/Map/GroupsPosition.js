import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import UseGroups from '../../hooks/UseGroups';
import UsePosition from '../../hooks/UsePosition';
import UserInfos from '../../hooks/UserInfos';
import MapMaterial from '../../ui/map/MapMaterial';

const GroupsPosition = () => {
  const [isLoad, setIsLoad] = useState(false);

  const { getMembersLastPositions, currentGroupsPositions } = UsePosition();
  const { getMember, loadSelectGroup, selectedGroup } = UseGroups();
  const { userData } = UserInfos();
  const { MembersMarker } = MapMaterial();

  const getMembersPosition = () => {
    return getMembersLastPositions(userData.utilisateurId, selectedGroup);
  };

  useEffect(() => {
    if (!isLoad) {
      getMembersPosition();
      setIsLoad(!isLoad);
    }
  }, []);

  return (
    <>
      {currentGroupsPositions[0] &&
        currentGroupsPositions.map(
          (member) =>
            member.status &&
            member.latitude && (
              <MembersMarker
                key={member.utilisateurPosition}
                position={[member.latitude, member.longitude]}
              >
                <Popup>{getMember(member, selectedGroup)}</Popup>
              </MembersMarker>
            ),
        )}
    </>
  );
};

export default GroupsPosition;
