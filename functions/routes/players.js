const createRoute = require('./createRoute');
const authenticate = require('../db/authenticate');
const { requireAdmin } = require('../utils/auth');
const generatePlayer = require('../helpers/generatePlayer')
const db = require('../db');

const app = createRoute();

const userOwnsPlayer = async (uid, playerId) => {
    const player = await db.collection('players').doc(playerId).get();

    return player.owner === db.collection('users').doc(uid);
}

app.get('/my', authenticate, async (req, res) => {
    const { uid } = req.user;

    const playersSnap = await db.collection('players')
        .where('owner', '==', db.collection('users').doc(uid))
        .get();

    res.json(playersSnap.docs.map(player => ({
        ...player.data(),
        id: player.id
    })));
});

app.get('/forSale', authenticate, async (req, res) => {
    const { uid } = req.user;

    const userRef = db.collection('users').doc(uid);

    const playersSnap = await db.collection('players')
        .where('forSale', '>', 0)
        .get();

    res.json(
        Array.from(playersSnap.docs
            .map(player => ({
                ...player.data(),
                id: player.id
            }))
            .filter(user => user.owner !== userRef)
    ));
});

app.post('/:id/sell', authenticate, async (req, res) => {
    const { uid } = req.user;
    const { id } = req.params;
    let { amount } = req.body;

    amount = parseInt(amount);

    if (amount <= 0) return res.status(403).json('Must sell for over 0 dollars');

    if (!userOwnsPlayer(uid, id)) return res.status(403).json('Not your player!! Sneaky');

    const playerRef = db.collection('players').doc(id);
        
    playerRef.set({
        forSale: amount,
    }, { merge: true });

    res.json((await playerRef.get()).data());
});

const getRandom = (min, max) => 
    Math.floor(Math.random() * (max - min) + min);

app.post('/:id/buy', authenticate, async (req, res) => {
    const { uid } = req.user;
    const { id } = req.params;

    const playerRef = db.collection('players').doc(id);
    const player = (await playerRef.get()).data();
    
    if (!player.forSale) return res.status(403).json('Player not for sale');

    const userRef = db.collection('users').doc(uid);
    const user = (await userRef.get()).data();

    if (user.balance < player.forSale) return res.status(403).json('You cannot afford this player');
    if (player.owner === userRef) return res.status(403).json('You cannot buy your own player')

    const oldOwnerRef = player.owner;
    const oldOwner = (await oldOwnerRef.get()).data();

    console.log(oldOwner.balance, player.forSale, user.balance)

    await oldOwnerRef.set({
        balance: oldOwner.balance + player.forSale,
    }, { merge: true });

    await userRef.set({
        balance: user.balance - player.forSale,
    }, {  merge: true });

    await playerRef.set({
        owner: userRef,
        forSale: 0,
        value: Math.floor(player.value * getRandom(110, 200) * 0.01),
    }, { merge: true });

    await db.collection('notifications').add({
        player: playerRef,
        read: false,
        user: oldOwnerRef
    }, { merge: true });

    res.json((await playerRef.get()).data());
});

app.put('/:id', authenticate, async (req, res) => {
    const { uid, isLeagueManager, isAdmin } = req.user;
    const { id } = req.params;
    const { firstName, lastName, country, position, age } = req.body;

    if (!userOwnsPlayer(uid, id)) return res.status(403).json('Not your player!! Sneaky');

    const playerRef = db.collection('players').doc(id);
    const player = await playerRef.get();
    
    const update = {
        firstName,
        lastName,
        country,
    };

    if (isLeagueManager || isAdmin) {
        update.position = position;
    }

    if (isAdmin) {
        update.age = age;
        update.value = value;
    }

    await player.set(update, { merge: true });

    res.json(await player.data());
});

app.post('/:id', authenticate, requireAdmin, async (req, res) => {
    const player = await db.collection.players.add(generatePlayer());

    res.json(player);
})

module.exports = app;