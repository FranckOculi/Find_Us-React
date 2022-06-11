import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGroup, removeGroupStore } from '../feature/group/groupsSlice';
import {
  addMember,
  removeMemberStore,
  reloadMemberStore,
} from '../feature/group/groupSingleMembersSlice';
import { addAllMembers } from '../feature/group/groupsMembersSlice';
import { setSelectedGroup } from '../feature/group/groupSelectedSlice';
import {
  getGroups,
  addGroup,
  deleteGroup,
  getMembers,
  addGroupMember,
} from '../services/GroupApi';
import _ from 'lodash';

export default function UseGroups() {
  const dispatch = useDispatch();
  const groupsData = useSelector((state) => state.groups);
  const membersData = useSelector((state) => state.groupSingleMembers);
  const allMembersData = useSelector((state) => state.groupsMembers);
  const selectedGroup = useSelector((state) => state.groupSelected.groupCode);

  /*  Groups  */
  const loadGroupsData = async (userId, data) => {
    const eachGroupCode = [];
    for (let i = 0; i < data.length; i++) {
      eachGroupCode.push(data[i].groupeCode);
    }
    return getGroups(userId, eachGroupCode).then((res) => {
      if (res?.data?.userGroups) {
        let i = 0;
        do {
          dispatch(setGroup(res.data.userGroups[i]));
          i++;
        } while (i < res.data.userGroups.length);
      }
      if (res?.data?.membersData) {
        const data = res.data.membersData.sort(function (a, b) {
          return a.groupeCode.toString().localeCompare(b.groupeCode.toString());
        });
        const sortedMember = _.groupBy(data, 'groupeCode');
        dispatch(addAllMembers(sortedMember));
      }
    });
  };

  const findGroup = async (code) => {
    for (let i = 0; i < groupsData.length; i++) {
      if (groupsData[i].codeGroupe === code) {
        return await groupsData[i];
      }
    }
    return;
  };

  const createGroup = async (id, data) => {
    return await addGroup(id, data);
  };

  const removeGroup = async (id, code) => {
    return await deleteGroup(id, code).then((res) => {
      if (!res.err) {
        dispatch(removeGroupStore(res.data.data.codeGroupe));
      }
    });
  };

  /*  Members  */
  const findMember = async (id, code) => {
    return await getMembers(id, code).then((res) => {
      if (res.data.members) {
        let i = 0;
        do {
          dispatch(addMember(res.data.members[i]));
          i++;
        } while (i < res.data.members.length);
      }
    });
  };

  const addMemberToGroup = async (id, codeGroup) => {
    return await addGroupMember(id, codeGroup).then((res) => {
      console.log(res);
      if (!res.err) {
        // dispatch(res);
      }
    });
  };

  const removeMember = () => {
    return dispatch(removeMemberStore(0));
  };

  const reloadMember = (id, code) => {
    dispatch(removeMemberStore(0));
    setTimeout(async () => {
      return await getMembers(id, code).then((res) => {
        if (res.data.members) {
          let i = 0;
          do {
            dispatch(addMember(res.data.members[i]));
            i++;
          } while (i < res.data.members.length);
        }
      });
    }, 500);
  };

  const getMember = (memberData, groupCode) => {
    const data = [];
    allMembersData.groupes[groupCode].map((member) => {
      if (member.utilisateurId === memberData.utilisateurPosition) {
        data.push(member);
      }
    });

    return data[0].pseudo;
  };

  const loadSelectGroup = (groupCode) => {
    dispatch(setSelectedGroup(groupCode));
  };

  return {
    groupsData,
    loadGroupsData,
    findGroup,
    findMember,
    membersData,
    createGroup,
    removeGroup,
    loadSelectGroup,
    selectedGroup,
    removeMember,
    // loadAllMembers,
    allMembersData,
    addMemberToGroup,
    reloadMember,
    getMember,
  };
}
