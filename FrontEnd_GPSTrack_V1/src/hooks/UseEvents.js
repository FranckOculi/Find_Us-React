import { useSelector, useDispatch } from 'react-redux';
import { setEvents, eraseEvent } from '../feature/userEventsSlice';
import { addMember } from '../feature/groupMembersSlice';
import { setCurrentEvents } from '../feature/currentEventsSlice';
import {
  getAllEvents,
  removeEvent,
  updateMember,
  addInvitation,
  getInvitation,
  getGroups,
} from '../services/EventApi';
import UseFriends from '../hooks/UseFriends';
import { compareDate, isEmpty } from '../utils/Utils';

export default function UseEvents() {
  const dispatch = useDispatch();
  const eventsData = useSelector((state) => state.userEvents);
  const eventMembers = useSelector((state) => state.eventMembers);
  const currentEventsData = useSelector((state) => state.currentEvents);
  const groupData = useSelector((state) => state.groups);
  const { fetchShortFriendInfo } = UseFriends();

  //Load all user events
  const loadEventsData = async (userId) => {
    return await getAllEvents(userId).then((res) => {
      if (!isEmpty(res.data.events)) {
        let i = 0;
        do {
          dispatch(setEvents(res.data.events[i]));
          i++;
        } while (i < res.data.events.length);
      }
      //Load current events
      for (let i = 0; i < res.data.events.length; i++) {
        compareDate(res.data.events[i].dateEvenement);
        compareDate(res.data.events[i].dateFin);
        if (
          (compareDate(res.data.events[i].dateEvenement) <= 0) &
          (compareDate(res.data.events[i].dateFin) >= 0)
        ) {
          dispatch(setCurrentEvents(res.data.events[i]));
          if (res.data.events[i].membres) {
            res.data.events[i].membres.split(' ').map(async (membre) => {
              return await fetchShortFriendInfo(membre).then((res) =>
                dispatch(addMember(res.data.shortUserInfo[0])),
              );
            });
          }
        }
      }
    });
  };

  const uploadEvent = (data) => {
    return dispatch(setEvents(data));
  };

  const deleteEvent = async (id, event) => {
    return await removeEvent(id, event).then(dispatch(eraseEvent(event)));
  };

  const addEventMember = async (id, codeEvenement, data, membres) => {
    const memberData = data.data.shortUserInfo[0];
    if (!isEmpty(membres)) {
      const newMembersData = membres + ' ' + memberData.utilisateurId;
      return await updateMember(id, codeEvenement, newMembersData);
    } else {
      return await updateMember(id, codeEvenement, memberData.utilisateurId);
    }
  };

  const createInvitation = async (code, inviteData) => {
    return await addInvitation(code, inviteData);
  };

  const fetchInvitationData = async (code) => {
    return await getInvitation(code);
  };

  const loadGroups = async (userId, data) => {
    return await getGroups(userId, data);
  };

  return {
    loadEventsData,
    currentEventsData,
    eventsData,
    uploadEvent,
    deleteEvent,
    addEventMember,
    eventMembers,
    createInvitation,
    fetchInvitationData,
    groupData,
    loadGroups,
  };
}
