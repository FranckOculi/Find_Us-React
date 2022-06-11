import { useDispatch, useSelector } from 'react-redux';
import { addPosition } from '../feature/group/groupSingleMembersSlice';
import {
  addAllPositions,
  setStatus,
  setAllStatus,
} from '../feature/group/groupPositionsSlice';
import { setPosition } from '../feature/position/positionSlice';
import {
  getPosition,
  addCurrentPosition,
  getGroupsPositions,
} from '../services/PositionsApi';

export default function UseEvents() {
  const dispatch = useDispatch();
  const currentPosition = useSelector((state) => state.position);
  const currentGroupsPositions = useSelector((state) => state.groupPositions);

  //fetch user position
  const getLastPosition = async (id) => {
    await getLastPosition(id).then((res) => {
      loadCurrentPosition(res);
    });
  };

  const savePosition = async (id, data) => {
    await addCurrentPosition(id, data).then((res) => {});
  };

  //Fetch and load friends current position
  const getMembersLastPositions = async (id, data) => {
    await getGroupsPositions(id, data).then((res) => {
      if (res.data.lastPositions) {
        for (let i = 0; i < res.data.lastPositions.length; i++) {
          dispatch(addAllPositions(res.data.lastPositions[i]));
        }
      }
    });
  };

  //Load user position
  const loadCurrentPosition = async (position) => {
    if (!currentPosition) dispatch(setPosition(position));
    else if (
      (position.latitude !== currentPosition.latitude) &
      (position.longitude !== currentPosition.longitude)
    ) {
      dispatch(setPosition(position));
    } else return;
  };

  const loadStatus = (id, status) => {
    const data = { id: id, status: status };
    dispatch(setStatus(data));
  };

  const loadAllStatus = (status) => {
    dispatch(setAllStatus(status));
  };

  return {
    currentPosition,
    currentGroupsPositions,
    getLastPosition,
    savePosition,
    getMembersLastPositions,
    loadCurrentPosition,
    loadStatus,
    loadAllStatus,
  };
}
