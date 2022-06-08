import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../feature/user/userAuthSlice';
import userIdReducer from '../feature/user/userIdSlice';
import userInfosReducer from '../feature/user/userInfosSlice';
import userGroupsReducer from '../feature/group/groupsSlice';
import groupSingleMembersReducer from '../feature/group/groupSingleMembersSlice';
import userGroupInvitationsReducer from '../feature/group/groupInvitationsSlice';
import userGroupMembersReducer from '../feature/group/groupsMembersSlice';
import positionsReducer from '../feature/position/positionsSlice';
import userFriendsReducer from '../feature/friends/userFriendsSlice';
import friendsReducer from '../feature/friends/friendsSlice';
import themeReducer from '../feature/other/themeSlice';

export default configureStore({
  reducer: {
    userAuth: userAuthReducer,
    userId: userIdReducer,
    userInfos: userInfosReducer,
    userGroups: userGroupsReducer,
    userGroupMembers: userGroupMembersReducer,
    groupSingleMembers: groupSingleMembersReducer,
    userGroupInvitations: userGroupInvitationsReducer,
    positions: positionsReducer,
    userFriends: userFriendsReducer,
    friends: friendsReducer,
    theme: themeReducer,
  },
});
