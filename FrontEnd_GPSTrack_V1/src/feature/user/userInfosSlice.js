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
    },

    clearInfos: (state, { payload }) => {
      state.utilisateurId = payload;
      state.pseudo = payload;
      state.prenom = payload;
      state.nom = payload;
      state.mail = payload;
      state.numeroTelephone = payload;
      state.photoProfil = payload;
      state.dateCreation = payload;
      state.statusTracking = payload;
    },
  },
});

export const { setInfos, clearInfos } = userInfoSlice.actions;
export default userInfoSlice.reducer;
