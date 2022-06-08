import { useDispatch, useSelector } from 'react-redux';
import { addPosition } from '../feature/group/groupSingleMembersSlice';
import { addFriendsPositions } from '../feature/position/friendsPositionsSlice';
import { setPosition } from '../feature/position/positionsSlice';
import { getLastPosition } from '../services/PositionsApi';
import { isEmpty } from '../utils/Utils';

export default function UseEvents() {
  const dispatch = useDispatch();
  const currentPosition = useSelector((state) => state.positions);
  const currentFriendsPosition = useSelector((state) => state.friendsPositions);

  //Load friends current position
  const getFriendsCurrentPosition = async (id) => {
    const codeGroup = 'DDth!(36';
    await getLastPosition(id, codeGroup).then((res) => {
      console.log(res);
      console.log(res.data.lastPositions);
      if (res?.data?.lastPositions) {
        let i = 0;
        do {
          dispatch(addFriendsPositions(res.data.lastPositions[i]));
          i++;
        } while (i < res.data.lastPositions.length);
      }
    });
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
    currentFriendsPosition,
  };
}
