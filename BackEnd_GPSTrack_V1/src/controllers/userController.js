import { dbServer } from '../../config/db.js';

export async function getUserInfo(req, res) {
  if (req.headers.tokenInfo.authorization == req.params.id) {
    // const userInfos = await dbServer
    // .select('*')
    // .from('Utilisateurs')
    // .join('Membres as m', 'Utilisateurs.utilisateurId', '=', 'M.membreId')
    // .join('Groupes as g', 'Membres.groupeCode', '=', 'g.codeGroupe')
    // .where({ utilisateurId: req.params.id });
    const userInfos = await dbServer
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
      )
      .from('Utilisateurs')
      .where({ utilisateurId: req.params.id });

    const events = await dbServer
      .select(
        'codeEvenement',
        'nomEvenement',
        'createur',
        'dateEvenement',
        'dateFin',
        'pseudoCreateur',
        'membres',
      )
      .from('Evenements')
      .where({ createur: req.params.id });

    return res.code(200).send({
      message: 'user Infos',
      userInfos: {
        user: userInfos[0],
        events: events,
      },
    });
  } else {
    return res.code(401).send({ message: 'Error token' });
  }
}

export async function getShortUserInfo(req, res) {
  console.log(req.params.id);
  const shortInfo = await dbServer
    .select(
      'utilisateurId',
      'pseudo',
      'prenom',
      'numeroTelephone',
      'statusTracking',
    )
    .from('Utilisateurs')
    .where({ utilisateurId: req.params.id });
  return res.code(200).send({
    message: 'short user infos',
    shortUserInfo: shortInfo,
  });
}

export async function getMe(req, res) {
  // if (req.headers.tokenInfo.authorization == req.params.id) {
  const userInfos = await dbServer
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
    )
    .from('Utilisateurs')
    .where({ utilisateurId: req.params.id });

  const friends = await dbServer
    .select('recepteurUserId')
    .from('Amis')
    .where({ emetteurUserId: req.params.id });

  const groups = await dbServer
    .select(
      //Membres
      // 'membreId',
      'groupeCode',
      'admin',
      //Groupes
      // 'codeGroupe',
      // 'nomGroupe',
      // 'createur',
      // 'description',
      // 'photoGroupe',
      // 'dateGroupe',
    )
    .from('Membres')
    // .join('Groupes as g', 'Membres.groupeCode', '=', 'g.codeGroupe')
    .where({
      membreId: req.params.id,
    });

  // const groups = await dbServer
  //     .select(
  //     'codeGroupe',
  //     'nomGroupe',
  //     'createur',
  //     'description',
  //     'photoGroupe',
  //     'dateGroupe')
  //     .from('Groupes')
  //     .where({
  //       codeGroupe
  //     })

  return res.code(200).send({
    message: 'me',
    userData: {
      user: userInfos[0],
      friends: friends,
      groups: groups,
    },
  });
  // } else {
  //   return res.code(401).send({ message: 'Error token' });
  // }
}

export async function deleteUser(req, res) {
  if (req.headers.tokenInfo.authorization == req.params.id) {
    await dbServer
      .delete()
      .from('Utilisateurs')
      .where({ utilisateurId: req.params.id });
    return res.code(200).send({ message: 'User deleted !' });
  } else {
    return res.code(401).send({ message: 'Error token' });
  }
}

export async function updateUser(req, res) {
  if (req.headers.tokenInfo.authorization == req.params.id) {
    await dbServer
      .update({
        pseudo: req.body.pseudo,
        prenom: req.body.prenom,
        nom: req.body.nom,
        mail: req.body.mail,
        motDePasse: req.body.motDePasse,
        numeroTelephone: req.body.numeroTelephone,
        photoProfil: req.body.photoProfil,
        statusTracking: req.body.statusTracking,
      })
      .from('Utilisateurs')
      .where({ utilisateurId: req.params.id });

    return res.code(201).send({ message: 'User updated !' });
  } else {
    return res.code(401).send({ message: 'Error token' });
  }
}
