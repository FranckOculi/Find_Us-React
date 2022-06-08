import { useSelector, useDispatch } from 'react-redux';
import { setInvitations } from '../feature/group/groupInvitationsSlice';
// import { getAllInvitations } from '../services/EventApi';
import { isEmpty } from '../utils/Utils';

export default function UseInvitations() {
  const dispatch = useDispatch();

  const userInvitations = useSelector((state) => state.userInvitations);

  // const loadInvitations = async (userId) => {
  //   return await getAllInvitations(userId).then((res) => {
  //     if (!isEmpty(res.data.statusInvitation)) {
  //       for (let i = 0; i < res.data.statusInvitation.length; i++) {
  //         dispatch(setInvitations(res.data.statusInvitation[i]));
  //       }
  //     }
  //   });
  // };

  return {
    userInvitations,
    // loadInvitations
  };
}
