import { dbServer } from '../../config/db.js';

export async function getAllFriends(req, res) {
  if (req.headers.tokenInfo.authorization === req.params.id) {
    const friends = await dbServer
      .select('recepteurUserId')
      .from('Amis')
      .where({ emetteurUserId: req.params.id });

    return res.code(200).send({
      message: 'All friends',
      friends: friends,
    });
  } else {
    return res.code(401).send({ message: 'Error token' });
  }
}

export async function addFriend(req, res) {
  await dbServer
    .insert([
      {
        emetteurUserId: req.params.id,
        recepteurUserId: req.params.friendId,
      },
    ])
    .into('Amis');
  return res.code(200).send({
    message: 'Friend added',
  });
}

export async function getFriendsData(req, res) {
  if (req.headers.tokenInfo.authorization == req.params.id) {
    const friendsId = req.params.friendsId.split(',');
    const friendsData = await dbServer
      .select(
        'utilisateurId',
        'pseudo',
        'prenom',
        'numeroTelephone',
        'statusTracking',
      )
      .from('Utilisateurs')
      .whereIn('utilisateurId', friendsId);
    return res.code(200).send({
      message: 'All friends data',
      friendsData: friendsData,
    });
  } else {
    return res.code(401).send({ message: 'Token required' });
  }
}
