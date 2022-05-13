import { useDispatch, useSelector } from 'react-redux';
import { addPosition } from '../feature/groupMembersSlice';
import { setPosition } from '../feature/userPositionsSlice';
import { getLastPosition } from '../services/PositionsApi';
import { isEmpty } from '../utils/Utils';

export default function UseEvents() {
  const dispatch = useDispatch();
  const currentPosition = useSelector((state) => state.userPositions);

  //Load friends current position
  const getFriendsCurrentPosition = async (eventMembers) => {
    if (!isEmpty(eventMembers)) {
      for (let i = 0; i < eventMembers.length; i++) {
        await getLastPosition(eventMembers[i].utilisateurId).then((res) => {
          if (!isEmpty(res.data.lastPosition)) {
            const data = [
              eventMembers[i].utilisateurId,
              res.data.lastPosition[0],
            ];
            dispatch(addPosition(data));
          }
        });
      }
    }
  };

  //Load user current position
  const loadCurrentPosition = async (position) => {
    if (!currentPosition) dispatch(setPosition(position));
    else if (
      (position.latitude !== currentPosition.latitude) &
      (position.longitude !== currentPosition.longitude)
    ) {
      dispatch(setPosition(position));
    } else return;
  };

  return {
    currentPosition,
    getFriendsCurrentPosition,
    loadCurrentPosition,
  };
}
