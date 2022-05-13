import React, { useEffect, useState } from 'react';
import { dateParser } from '../../utils/Utils';

const EventCard = ({
  cardModalChange,
  removeEvent,
  eventData,
  searchModalChange,
  fetchInvitationStatus,
  setInvitationStatus,
  invitationStatus,
}) => {
  const [isLoad, setIsLoad] = useState(false);
  const loadInvitations = async () => {
    await fetchInvitationStatus(eventData.codeEvenement).then((res) =>
      setInvitationStatus(res.data.statusInvitation),
    );
  };

  useEffect(() => {
    if (!isLoad) {
      loadInvitations();
      setIsLoad(true);
    }
  }, []);

  return (
    <div className='eventCard'>
      <div className='eventCardDiv'>
        <div id='eventCardLabel'>Name:</div>
        <span id='eventCardInfo'>{eventData.nomEvenement}</span>
      </div>
      <div className='eventCardDiv'>
        <div id='eventCardLabel'>Start date:</div>
        <span id='eventCardInfo'>{dateParser(eventData.dateEvenement)}</span>
      </div>

      <div className='eventCardDiv'>
        <div id='eventCardLabel'>End date:</div>
        <span id='eventCardInfo'>{dateParser(eventData.dateFin)}</span>
      </div>

      <div className='eventCardDiv'>
        <div id='eventCardLabel'>Creator:</div>
        <span id='eventCardInfo'>{eventData.pseudoCreateur}</span>
      </div>

      <div className='eventCardDiv'>
        <div id='eventCardLabel'>Members:</div>
        <span id='eventCardInfoMembers'>
          {invitationStatus &&
            invitationStatus.map((invite) => (
              <div key={invite.inviteId}>
                {invite.prenomInvite} {invite.statusInvitation}
                {invite.statusInvitation === true ? (
                  ''
                ) : (
                  <span>{' -- waiting'}</span>
                )}
              </div>
            ))}
        </span>
      </div>
      <button id='eventCardInvitMembersbtn' onClick={searchModalChange}>
        Invite friends
      </button>

      <div>
        <button id='eventCardBtnBack' onClick={cardModalChange}>
          Back
        </button>
        <button
          id='eventCardBtnDelete'
          onClick={(eventData) => {
            console.log('hello');
            removeEvent(eventData);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
