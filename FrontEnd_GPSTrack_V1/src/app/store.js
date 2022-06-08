import { configureStore } from '@reduxjs/toolkit';
import userIdReducer from '../feature/userIdSlice';
import userInfosReducer from '../feature/userInfosSlice';
import userGroupsReducer from '../feature/userGroupsSlice';
import userFriendsReducer from '../feature/userFriendsSlice';
import userPositionsReducer from '../feature/userPositionsSlice';
import useAuthReducer from '../feature/useAuthSlice';
import currentEventsReducer from '../feature/currentEventsSlice';
import groupMembersReducer from '../feature/groupMembersSlice';
import userInvitationsReducer from '../feature/userInvitationsSlice';
import allMembersReducer from '../feature/allMembersSlice';
import friendsReducer from '../feature/friendsSlice';
import themeReducer from '../feature/themeSlice';

export default configureStore({
  reducer: {
    userId: userIdReducer,
    userInfos: userInfosReducer,
    userGroups: userGroupsReducer,
    userFriends: userFriendsReducer,
    userPositions: userPositionsReducer,
    useAuth: useAuthReducer,
    currentEvents: currentEventsReducer,
    groupMembers: groupMembersReducer,
    userInvitations: userInvitationsReducer,
    allMembers: allMembersReducer,
    friends: friendsReducer,
    theme: themeReducer,
  },
});
