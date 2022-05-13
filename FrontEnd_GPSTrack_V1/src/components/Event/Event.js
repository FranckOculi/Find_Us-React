import React from 'react';
import { dateParser } from '../../utils/Utils';

const Event = ({ event, userData, diplayCard }) => {
  return (
    <div id='event' onClick={() => diplayCard(event)}>
      <span id='eventName'>{event.nomEvenement}</span>
      <div>
        <span id='eventDate'>{dateParser(event.dateEvenement)}</span>
        {event.createur === userData.utilisateurId ? (
          <span id='eventCreator'>You</span>
        ) : (
          <span id='eventCreator'>event.pseudoCreateur</span>
        )}
      </div>
    </div>
  );
};

export default Event;
