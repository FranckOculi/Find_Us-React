import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfos from '../../hooks/UserInfos';
import UseGroups from '../../hooks/UseGroups';
import GroupCard from './GroupCard';
import { Box, Paper } from '@mui/material';
import Icon from '@mui/material/Icon';

import { compareDate, dateParser, compareTwoDates } from '../../utils/Utils';

const GroupList = () => {
  const navigate = useNavigate();
  const { groupsData, loadGroup } = UseGroups();
  const { userData, userId } = UserInfos();

  const handleGoToGroupForm = () => {
    navigate('/group/create', { replace: true });
  };

  if (!groupsData) {
    return (
      <div className='eventsContainer'>
        <p id='eventP'>There is no event yet</p>
        <button id='btnCreateEvent' onClick={handleGoToGroupForm()}>
          Create event
        </button>
      </div>
    );
  }

  if (groupsData) {
    return (
      <div className='groupsContainer'>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          elevation={0}
        >
          {groupsData
            // .sort((a, b) => dateParser(b.dateGroupe) - dateParser(a.dateGroupe))
            .map((group) => (
              <GroupCard key={group.codeGroupe} group={group} />
            ))}
          <Box
            sx={{
              '& > :not(style)': {
                m: 2,
              },
            }}
          ></Box>
          <Icon
            display='flex'
            color='primary'
            sx={{ mt: 1, fontSize: 30 }}
            onClick={handleGoToGroupForm}
          >
            add_circle
          </Icon>
        </Paper>
      </div>
    );
  }
  return <div>Groups</div>;
};

export default GroupList;

/*
{ {isEmpty(eventsData) ? (
    <>
      {eventFormModal ? (
        <div className='eventsContainer'>
          <EventForm
            userData={userData}
            handleUploadEvent={handleUploadEvent}
          />
          <button className='eventCancel' onClick={formModalChange}>
            Cancel
          </button>
        </div>
      ) : (
        <div className='eventsContainer'>
          <p id='eventP'>There is no event yet</p>
          <button
            id='btnCreateEvent'
            onClick={() => {
              formModalChange();
            }}
          >
            Create event
          </button>
        </div>
      )}
    </>
  ) : (
    <>
      {eventFormModal ? (
        <div className='eventsContainer'>
          <EventForm
            userData={userData}
            handleUploadEvent={handleUploadEvent}
          />
          <button className='eventCancel' onClick={formModalChange}>
            Cancel
          </button>
        </div>
      ) : (
        <div className='eventsContainer'>
          {eventCardModal ? (
            <>
              {eventSearchModal ? (
                <>
                  <FriendsSearch
                    searchModalChange={searchModalChange}
                    handleAddMembers={handleAddMembers}
                    eventSearchData={eventSearchData}
                    userData={userData}
                    handleSendInvitation={handleSendInvitation}
                    invitationStatus={invitationStatus}
                  />
                  <Friends />
                </>
              ) : (
                <EventCard
                  eventData={eventData}
                  cardModalChange={cardModalChange}
                  removeEvent={removeEvent}
                  searchModalChange={searchModalChange}
                  handleAddMembers={handleAddMembers}
                  fetchName={fetchName}
                  fetchInvitationStatus={fetchInvitationStatus}
                  setInvitationStatus={setInvitationStatus}
                  invitationStatus={invitationStatus}
                />
              )}
            </>
          ) : (
            <>
              {eventsData.map((event) => (
                <Event
                  key={event.codeEvenement}
                  event={event}
                  userData={userData}
                  diplayCard={diplayCard}
                />
              ))}

              <button id='btnCreateNewEvent' onClick={formModalChange}>
                Add
              </button>
            </>
          )}
        </div>
      )}
    </>
  )} }
  {/* <button onClick={fetchMe}>GetMe</button>
  <button onClick={fetchGroup}>Get Groups</button> }
  */
