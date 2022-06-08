import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../feature/user/userAuthSlice';
import userIdReducer from '../feature/user/userIdSlice';
import userInfosReducer from '../feature/user/userInfosSlice';
import groupsReducer from '../feature/group/groupsSlice';
import groupSingleMembersReducer from '../feature/group/groupSingleMembersSlice';
import groupInvitationsReducer from '../feature/group/groupInvitationsSlice';
import groupsMembersReducer from '../feature/group/groupsMembersSlice';
import positionsReducer from '../feature/position/positionsSlice';
import friendsPositionsReducer from '../feature/position/friendsPositionsSlice';
import friendsIdReducer from '../feature/friend/friendsIdSlice';
import friendsDataReducer from '../feature/friend/friendsDataSlice';
import themeReducer from '../feature/other/themeSlice';

export default configureStore({
  reducer: {
    userAuth: userAuthReducer,
    userId: userIdReducer,
    userInfos: userInfosReducer,
    groups: groupsReducer,
    groupsMembers: groupsMembersReducer,
    groupSingleMembers: groupSingleMembersReducer,
    groupInvitations: groupInvitationsReducer,
    positions: positionsReducer,
    friendsPositions: friendsPositionsReducer,
    friendsId: friendsIdReducer,
    friendsData: friendsDataReducer,
    theme: themeReducer,
  },
});
