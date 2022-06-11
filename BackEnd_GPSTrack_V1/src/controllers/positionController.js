import { dbServer } from '../../config/db.js';

export async function addPosition(req, res) {
  if (req.headers.tokenInfo.authorization == req.params.id) {
    await dbServer
      .insert([
        {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          utilisateurPosition: req.params.id,
          // codeEvenement: req.body.codeEvenement,
        },
      ])
      .into('Positions');
    res.code(201).send({ message: 'Location added !' });
  } else {
    return res.code(401).send({ message: 'Error token' });
  }
}

export async function getLastPosition(req, res) {
  if (req.headers.tokenInfo.authorization == req.params.id) {
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
  } else {
    return res.code(401).send({ message: 'Error token' });
  }
}

export async function getGroupsLastPositions(req, res) {
  if (req.headers.tokenInfo.authorization == req.params.id) {
    //fetch membersId > unsorted position > lastPositions :

    //membersId
    const membersId = await dbServer
      .select('membreId')
      .from('Membres')
      .join('Groupes as g', 'Membres.groupeCode', '=', 'g.codeGroupe')
      .where('groupeCode', req.params.codeGroup);

    const parsedMembersId = [];
    for (let i = 0; i < membersId.length; i++) {
      parsedMembersId.push(membersId[i].membreId);
    }

    //unsorted position
    const unsortedPosition = await dbServer
      .select(
        'positionId',
        'utilisateurPosition',
        'latitude',
        'longitude',
        'datePosition',
      )
      .rowNumber('maxDate', function () {
        this.partitionBy('utilisateurPosition');
        this.orderBy('datePosition');
      })
      .whereIn('utilisateurPosition', parsedMembersId)
      .from('Positions');

    const sortedPosition = [];
    for (let i = 0; i < unsortedPosition.length; i++) {
      if (unsortedPosition[i].maxDate == 1) {
        sortedPosition.push(unsortedPosition[i].positionId);
      }
    }
    //lastPositions
    const lastPositions = await dbServer
      .select(
        'codeGroupe',
        'utilisateurPosition',
        'latitude',
        'longitude',
        'datePosition',
        'status',
      )
      .from('Positions')
      .join('Membres as m', 'Positions.utilisateurPosition', '=', 'm.membreId')
      .join('Groupes as g', 'm.groupeCode', '=', 'g.codeGroupe')
      .where('groupeCode', req.params.codeGroup)
      .whereIn('positionId', sortedPosition)
      .groupBy(
        'codeGroupe',
        'utilisateurPosition',
        'latitude',
        'longitude',
        'datePosition',
        'status',
      );

    return res
      .code(200)
      .send({ message: 'Last positions', lastPositions: lastPositions });
  } else {
    return res.code(401).send({ message: 'Error token' });
  }
}
