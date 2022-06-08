import { dbServer } from '../../config/db.js';
import Token from '../utils/Token.js';

/* Groups */

export async function getAllGroups(req, res) {
  if (req.headers.tokenInfo.authorization == req.params.id) {
    const groups = await dbServer
      .select(
        'codeGroupe',
        'nomGroupe',
        'createur',
        'description',
        'photoGroupe',
        'dateGroupe',
      )
      .from('Groupes')
      .whereIn('codeGroupe', req.body);

    const membersData = await dbServer
      .select(
        'utilisateurId',
        'pseudo',
        'prenom',
        'nom',
        'mail',
        'numeroTelephone',
        'photoProfil',
        'dateCreation',
        'statusTracking',
        'membreId',
        'groupeCode',
        'admin',
      )
      .from('Membres')
      .join('Utilisateurs as u', 'Membres.membreId', '=', 'u.utilisateurId')
      .join('Groupes as g', 'Membres.groupeCode', '=', 'g.codeGroupe')
      .whereIn('groupeCode', req.body)
      .groupBy(
        'groupeCode',
        'utilisateurId',
        'pseudo',
        'prenom',
        'nom',
        'mail',
        'numeroTelephone',
        'photoProfil',
        'dateCreation',
        'statusTracking',
        'membreId',
        'admin',
      );

    return res.code(200).send({
      message: 'All user groups',
      userGroups: groups,
      membresData: membersData,
    });
  } else {
    return res.code(401).send({ message: 'Error token' });
  }
}

export async function addGroup(req, res) {
  if (req.headers.tokenInfo.authorization == req.params.id) {
    console.log(req.headers.tokenInfo);
    const code = createCode();
    await dbServer
      .insert([
        {
          codeGroupe: code,
          nomGroupe: req.body.nomGroupe,
          description: req.body.description,
          createur: req.params.id,
        },
      ])
      .into('Groupes');
    await dbServer
      .insert([
        {
          groupeCode: code,
          membreId: req.params.id,
          admin: 'true',
        },
      ])
      .into('Membres');

    return res.code(201).send({
      message: 'Group added !',
      data: {
        codeGroupe: code,
        nomGroupe: req.body.nomGroupe,
        description: req.body.description,
        createur: req.params.id,
      },
    });
  } else {
    return res.code(401).send({ message: 'Error token' });
  }
}

export async function deleteGroup(req, res) {
  await dbServer.delete().from('Groupes').where({
    codeGroupe: req.params.codeGroup,
  });

  return res.code(200).send({
    message: 'Group deleted !',
    data: {
      codeGroupe: req.params.codeGroup,
    },
  });
}

export async function updateGroup(req, res) {
  await dbServer
    .update({
      nomGroupe: req.body.nomGroupe,
      description: req.body.description,
      photoGroupe: req.body.photoGroupe,
    })
    .from('Groupes')
    .where({
      codeGroupe: req.params.codeGroup,
    });

  return res.code(201).send({ message: 'Group updated !' });
}

/* Members */
export async function getAllMembers(req, res) {
  const members = await dbServer
    .distinct(
      'utilisateurId',
      'pseudo',
      'prenom',
      'nom',
      'mail',
      'numeroTelephone',
      'photoProfil',
      'dateCreation',
      'statusTracking',
      'groupeCode',
    )
    .from('Utilisateurs')
    .join('Membres as m', 'Utilisateurs.utilisateurId', '=', 'm.membreId')
    .whereIn('groupeCode', req.body);
  return res.code(200).send({ message: 'All members !', members: members });
}

export async function getMembers(req, res) {
  const members = await dbServer
    .select(
      'utilisateurId',
      'pseudo',
      'prenom',
      'nom',
      'mail',
      'numeroTelephone',
      'photoProfil',
      'dateCreation',
      'statusTracking',
      'admin',
    )
    .from('Membres')
    .join('Utilisateurs as u', 'Membres.membreId', '=', 'u.utilisateurId')
    .where({ groupeCode: req.params.codeGroup });

  return res.code(200).send({
    message: 'All members',
    members: members,
  });
}

export async function addMember(req, res) {
  console.log(req.params);
  await dbServer
    .insert({
      membreId: req.params.id,
      groupeCode: req.params.codeGroup,
    })
    .from('Membres');
  return res.code(201).send({ message: 'Group updated !' });
}

const createCode = () => {
  const upperChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChar = 'abcdefghijklmnopqrstuvwxyz';
  const numberChar = '123456789';
  const otherChar = '~!^*()-_+';

  const randomNum1 = Math.round(Math.random() * 25);
  const randomNum1bis = Math.round(Math.random() * 25);
  const randomNum2 = Math.round(Math.random() * 25);
  const randomNum2bis = Math.round(Math.random() * 25);
  const randomNum3 = Math.round(Math.random() * 8);
  const randomNum3bis = Math.round(Math.random() * 8);
  const randomNum4 = Math.round(Math.random() * 8);
  const randomNum4bis = Math.round(Math.random() * 8);

  let code = '';
  code =
    upperChar.charAt(randomNum1) +
    upperChar.charAt(randomNum1bis) +
    lowerChar.charAt(randomNum2) +
    lowerChar.charAt(randomNum2bis) +
    otherChar.charAt(randomNum3) +
    otherChar.charAt(randomNum3bis) +
    numberChar.charAt(randomNum4) +
    numberChar.charAt(randomNum4bis);

  return code;
};

// export async function addInvitation(req, res) {
//   await dbServer
//     .insert([
//       {
//         codeEvenementInvitation: req.params.codeEvent,
//         inviteId: req.body.inviteId,
//         prenomInvite: req.body.invitePrenom,
//       },
//     ])
//     .into('Invitations');
//   return res.code(201).send({
//     message: 'Invitation added !',
//   });
// }

// export async function getInvitation(req, res) {
//   const status = await dbServer
//     .select('inviteId', 'prenomInvite', 'statusInvitation')
//     .from('Invitations')
//     .where({
//       codeEvenementInvitation: req.params.codeEvent,
//     });
//   return res.code(200).send({
//     message: 'all invitations',
//     statusInvitation: status,
//   });
// }

// export async function getAllInvitations(req, res) {
//   const events = await dbServer
//     .select('codeEvenementInvitation')
//     .from('Invitations')
//     .where({
//       inviteId: req.params.id,
//     });
//   return res.code(200).send({
//     message: 'all invitations',
//     statusInvitation: events,
//   });
// }
