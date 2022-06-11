import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UseGroups from '../../hooks/UseGroups';
import GroupCard from './GroupCard';
import GroupListMaterial from '../../ui/group/GroupListMaterial';
import { dateParser } from '../../utils/Utils';
import Loader from '../other/Loader';

const GroupList = () => {
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();
  const { groupsData, loadSelectGroup } = UseGroups();
  const { NewGroupButton, GroupListPaper, GroupListIcon, DivList } =
    GroupListMaterial();

  const handleGoToGroupForm = () => {
    navigate('/group/create', { replace: true });
  };

  useEffect(() => {
    if (!isLoad && groupsData) {
      setIsLoad(true);
    }
    if (groupsData[0]) loadSelectGroup(groupsData[0].codeGroupe);
  }, [groupsData[0]]);

  if (!isLoad) return <Loader />;
  else if (groupsData[0]) {
    return (
      <div className='groupsContainer'>
        <GroupListPaper>
          {groupsData
            // .sort((a, b) => dateParser(b.dateGroupe) - dateParser(a.dateGroupe))
            .map((group) => (
              <GroupCard key={group.codeGroupe} group={group} />
            ))}
        </GroupListPaper>
        <GroupListIcon onClick={handleGoToGroupForm}>
          Add a new group
        </GroupListIcon>
        <DivList>Add a new group</DivList>
      </div>
    );
  } else if (isLoad && !groupsData[0]) {
    return (
      <div className='groupsContainer'>
        <p id='eventP'>There is no group yet</p>
        <NewGroupButton onClick={handleGoToGroupForm}>
          Create a new group
        </NewGroupButton>
      </div>
    );
  }
};

export default GroupList;
