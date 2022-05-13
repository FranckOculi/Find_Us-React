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

export async function getLastPosition(req, res) {
  const lastPosition = await dbServer
    .select('latitude', 'longitude')
    .from('Positions')
    .where({
      utilisateurPosition: req.params.id,
    })
    .orderBy('datePosition', 'desc')
    .limit(1);
  return res
    .code(200)
    .send({ message: 'Last position', lastPosition: lastPosition });
}
