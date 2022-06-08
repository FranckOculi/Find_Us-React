import { dbServer } from '../../config/db.js';

export async function addPosition(req, res) {
  if (req.headers.tokenInfo.authorization == req.params.id) {
    await dbServer
      .insert([
        {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          utilisateurPosition: req.params.id,
          codeEvenement: req.body.codeEvenement,
        },
      ])
      .into('Positions');
    res.code(201).send({ message: 'Location added !' });
  } else {
    return res.code(401).send({ message: 'Error token' });
  }
}

export async function getPositions(req, res) {
  if (req.headers.tokenInfo.authorization == req.params.id) {
    const positions = await dbServer
      .select('latitude', 'longitude')
      .from('Positions')
      .where({
        utilisateurPosition: req.params.id,
        codeEvenement: req.params.codeEvent,
      })
      .orderBy('datePosition', 'desc');
    return res
      .code(200)
      .send({ message: 'All positions', positions: positions });
  } else {
    return res.code(401).send({ message: 'Error token' });
  }
}

export async function getLastPositions(req, res) {
  if (req.headers.tokenInfo.authorization == req.params.id) {
    const data = await dbServer
      .select('latitude', 'longitude', 'utilisateurPosition')
      .from('Positions')
      .where({
        codeEvenement: req.params.codeGroup,
      })
      .orderBy('datePosition', 'desc');

    const friendsId = [];
    if (data[0]) {
      for (let i = 0; i < data.length; i++) {
        friendsId.push(data[i].utilisateurPosition);
      }
    }

    const lastPositions = await dbServer
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
        'latitude',
        'longitude',
      )
      .from('Positions')
      .join(
        'Utilisateurs as u',
        'Positions.utilisateurPosition',
        '=',
        'u.utilisateurId',
      )
      .whereIn('utilisateurId', friendsId)
      .where({
        codeEvenement: req.params.codeGroup,
      })
      .orderBy('datePosition', 'desc');
    return res
      .code(200)
      .send({ message: 'Last positions', lastPositions: lastPositions });
  } else {
    return res.code(401).send({ message: 'Error token' });
  }
}
