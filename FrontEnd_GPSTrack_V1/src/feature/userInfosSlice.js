import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
  name: 'infos',
  initialState: {
    utilisateurId: null,
    pseudo: null,
    prenom: null,
    nom: null,
    mail: null,
    numeroTelephone: null,
    photoProfil: null,
    dateCreation: null,
    statusTracking: null,
  },
  // initialState: [],
  // initialState: {
  //   user: [],
  //   friends: [],
  //   groups: [],
  // },

  reducers: {
    setInfos: (state, { payload }) => {
      state.utilisateurId = payload.utilisateurId;
      state.pseudo = payload.pseudo;
      state.prenom = payload.prenom;
      state.nom = payload.nom;
      state.mail = payload.mail;
      state.numeroTelephone = payload.numeroTelephone;
      state.photoProfil = payload.photoProfil;
      state.dateCreation = payload.dateCreation;
      state.statusTracking = payload.statusTracking;
      // payload.user && (state.user = payload.user);
      // payload.groups && (state.friends = payload.friends);
      // payload.groups && (state.groups = payload.groups);
    },
  },
});

export const { setInfos } = userInfoSlice.actions;
export default userInfoSlice.reducer;

// const events = {
//   name: 'events',
//   initialState:{
//     recepteurUserId: null,
//     codeEvenement: null,
//     nomEvenement: null,
//     duree: null,
//     dateEvenement: null,
//   }
// }

// const locations = {
//   name: 'locations',
//   initialState:{
//     latitude: null,
//     longitude: null,
//     codeEvenement: null,
//     datePosition: null,
//   }
// }

// setUserInfo: (state, { payload }) => {
//   state.info = payload;
// },
// setUserFriends: (state, { payload }) => {
//   state.friends = payload;
// },
// setUserEvents: (state, { payload }) => {
//   state.events = payload;
// },
// setUserLocations: (state, { payload }) => {
//   state.locations = payload;
// },
