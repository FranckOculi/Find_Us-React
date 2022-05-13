import React, { useState, useEffect, useRef } from 'react';
import UseGroups from '../hooks/UseGroups';
import UserInfos from '../hooks/UserInfos';
// import { isEmpty } from '../utils/Utils';
// import Event from '../components/Event/Event';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import GroupList from '../components/Group/GroupList';
// import EventForm from '../components/Event/EventForm';
// import EventCard from '../components/Event/EventCard';
// import UseFriends from '../hooks/UseFriends';
// import FriendsSearch from '../components/Friend/FriendsSearch';
// import Friends from '../components/Friend/Friends';
import Loader from '../components/Other/Loader';

const Home = () => {
  const isMounted = useRef(true);
  const [isLoad, setIsLoad] = useState(false);
  const { groupsData, loadGroup } = UseGroups();
  const { userData, userId } = UserInfos();
  // const {
  // loadEventsData,
  // eventsData,
  // uploadEvent,
  // deleteEvent,
  // addEventMember,
  // createInvitation,
  // fetchInvitationData,
  //   groupData,
  //   loadGroups,
  // } = UseEvents();
  // const { fetchShortFriendInfo, fetchNameMember } = UseFriends();
  // const [eventFormModal, setEventFormModal] = useState(false);
  // const [eventCardModal, setEventCardModal] = useState(false);
  // const [eventSearchModal, setEventSearchModal] = useState(false);

  // const [eventData, setEventData] = useState([]);
  // const [friendData, setFriendData] = useState([]);
  // const [invitationStatus, setInvitationStatus] = useState([]);

  // const [test, setTest] = useState([]);

  // //Modal
  // const formModalChange = () => setEventFormModal(!eventFormModal);

  // const cardModalChange = () => setEventCardModal(!eventCardModal);

  // const searchModalChange = () => setEventSearchModal(!eventSearchModal);

  // //CRUD Event
  // const loadEvent = () => loadEventsData(userData.utilisateurId);

  // const diplayCard = (event) => {
  //   setEventData(event);
  //   setEventCardModal(!eventCardModal);
  // };

  // const fetchName = async (id) => {
  //   return await fetchNameMember(id);
  // };

  // const handleSendInvitation = async (inviteId, invitePrenom) => {
  //   const inviteData = { inviteId, invitePrenom };
  //   return await createInvitation(eventData.codeEvenement, inviteData).then(
  //     (res) => console.log(res),
  //   );
  // };
  // const fetchInvitationStatus = async (code) => {
  //   return await fetchInvitationData(code);
  // };

  // const handleUploadEvent = (eventFormData) => {
  //   uploadEvent(eventFormData);
  //   formModalChange();
  // };

  // const removeEvent = async () => {
  //   return await deleteEvent(eventData.createur, eventData.codeEvenement).then(
  //     cardModalChange(),
  //   );
  // };

  // //Friend
  // const eventSearchData = (searchData) => setFriendData(searchData);

  // const handleAddMembers = async (id) => {
  //   await fetchShortFriendInfo(id).then(async (res) => {
  //     await addEventMember(
  //       userData.utilisateurId,
  //       eventData.codeEvenement,
  //       res,
  //       eventData.membres,
  //     )
  //       .then(() => window.location.reload())
  //       .then(() => setIsLoad(!isLoad));
  //   });
  // };
  useEffect(() => {
    if (!isLoad & userId & !groupsData) {
      loadGroup();
      setIsLoad(true);
    }

    return () => {
      isMounted.current = false;
      setIsLoad(true);
    };
  }, [groupsData, userData]);

  // const fetchMe = async () => {
  //   return await loadMe(userId).catch((err) => console.log(err));
  //   // .then((res) => {
  //   //   console.log(res);
  //   //   for (let i = 0; i < res.data.userData.membres.length; i++) {
  //   //     test.push(res.data.userData.membres[i].groupeCode.toString());
  //   //   }
  //   // });
  // };

  // const fetchGroup = async () => {
  //   if (test) {
  //     console.log(test);
  //     return await loadGroups(userId, test).then((res) => console.log(res));
  //   }
  // };

  if (!isLoad & !!groupsData) {
    return (
      <div className='home'>
        <Header />
        <GroupList />
        <Footer />
      </div>
    );
  } else if (!isLoad) {
    return <Loader />;
  }

  return (
    <div className='home'>
      <Header />
      <GroupList />
      <Footer />
    </div>
  );

  /*
 return (
    <div className='home'>
      <Header />
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
       <Footer />
     </div>
   );
   */
};

export default Home;
