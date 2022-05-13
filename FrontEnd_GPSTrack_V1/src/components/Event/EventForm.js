import React, { useState } from 'react';
import { addEvent } from '../../services/EventApi';

const EventForm = ({ userData, handleUploadEvent }) => {
  const [state1, setState1] = useState(true);
  const [name, setName] = useState('');
  const [eventInputError, setEventInputError] = useState('inputEventForm');
  const [state2, setState2] = useState(false);
  const [debut, setDebut] = useState('');
  const [end, setEnd] = useState('');
  const [eventDateDebutError, setEventDateDebutError] =
    useState('dateEventDebut');
  const [eventDateEndError, setEventDateEndError] = useState('dateEventEnd');

  const handleCreate = async (e) => {
    const dateDebut = debut + ':00.000Z';
    const dateFin = end + ':00.000Z';

    const data = {
      nomEvenement: name,
      createur: userData.utilisateurId,
      dateEvenement: dateDebut,
      dateFin: dateFin,
      pseudoCreateur: userData.pseudo,
    };

    if (!debut) {
      setEventDateDebutError('dateEventDebutError');
    }
    if (!end) {
      setEventDateEndError('dateEventEndError');
    }
    if (debut >= end) {
      e.preventDefault();
      setEventDateDebutError('dateEventDebutError');
      setEventDateEndError('dateEventEndError');
    } else if (debut && end && end > debut) {
      e.preventDefault();
      return await addEvent(userData.utilisateurId, data)
        .then((res) => {
          if (!res.err) {
            console.log(res);
            const eventData = {
              codeEvenement: res.data.data,
              nomEvenement: name,
              createur: userData.utilisateurId,
              dateEvenement: dateDebut,
              dateFin: dateFin,
              pseudoCreateur: userData.pseudo,
            };
            handleUploadEvent(eventData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form action='createEvent' onSubmit={handleCreate} className='eventForm'>
      <p id='eventP'>Create the event</p>
      {state1 && (
        <>
          <input
            type='text'
            placeholder='Event name'
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
              setEventInputError('inputEventForm');
            }}
            className={eventInputError}
            maxLength='25'
          />
          <button
            className='eventRegister'
            onClick={() => {
              if (name) {
                setState1(false);
                setState2(!state2);
              } else {
                setEventInputError('inputEventFormError');
              }
            }}
          >
            Next
          </button>
        </>
      )}
      {state2 && (
        <>
          <p id='eventDateTextDebut'>debut</p>
          <input
            type='datetime-local'
            value={debut}
            required
            onChange={(e) => {
              setDebut(e.target.value);
              setEventDateDebutError('dateEventDebut');
              setEventDateEndError('dateEventEnd');
            }}
            id={eventDateDebutError}
          />
          <p id='eventDateTextEnd'>end</p>
          <input
            type='datetime-local'
            value={end}
            required
            onChange={(e) => {
              setEnd(e.target.value);
              setEventDateEndError('dateEventEnd');
              setEventDateDebutError('dateEventDebut');
            }}
            id={eventDateEndError}
          />
        </>
      )}

      {state2 && (
        <input
          type='submit'
          value='Create'
          id={debut && end ? 'eventFormSubmitActive' : 'eventFormSubmit'}
        />
      )}
    </form>
  );
};

export default EventForm;
