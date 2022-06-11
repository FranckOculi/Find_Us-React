import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../feature/user/userAuthSlice';
import userIdReducer from '../feature/user/userIdSlice';
import userInfosReducer from '../feature/user/userInfosSlice';
import groupsReducer from '../feature/group/groupsSlice';
import groupSingleMembersReducer from '../feature/group/groupSingleMembersSlice';
import groupInvitationsReducer from '../feature/group/groupInvitationsSlice';
import groupsMembersReducer from '../feature/group/groupsMembersSlice';
import groupPositionsReducer from '../feature/group/groupPositionsSlice';
import groupSelectedReducer from '../feature/group/groupSelectedSlice';
import positionReducer from '../feature/position/positionSlice';
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
    groupPositions: groupPositionsReducer,
    groupSelected: groupSelectedReducer,
    position: positionReducer,
    friendsId: friendsIdReducer,
    friendsData: friendsDataReducer,
    theme: themeReducer,
  },
});
