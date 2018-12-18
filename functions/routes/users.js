const createRoute = require('./createRoute');

const db = require('../db');
const authenticate = require('../db/authenticate');
const generateTeam = require('../helpers/generateTeam');
const { requireLeagueManager, requireAdmin } = require('../helpers/auth');

const app = createRoute();

const INITIAL_BALANCE = 5000000;

app.get('/', authenticate, requireLeagueManager, async (req, res) => {
    const usersRef = await db.collection('users').get();
    res.json(usersRef.docs.map(user => ({
        ...user.data(),
        id: user.id
    })));
});

app.get('/me', authenticate, async (req, res) => {
    const { uid } = req.user;

    const user = (await db.collection('users').doc(uid).get()).data();
    res.json(user);
});

app.get('/:id/team', authenticate, requireLeagueManager, async (req, res) => {
    const { id } = req.params;

    const playersRef = await db.collection('players')
        .where('owner', '==', db.collection('users').doc(id))
        .get();

    res.json(playersRef.docs.map(player => ({
        ...player.data(),
        id: player.id
    })));
});

app.post('/', authenticate, async (req, res) => {
    const { uid } = req.user;
    const {
        name,
        teamName,
        teamCountry,
    } = req.body;

    const user = {
        name,
        teamName,
        teamCountry,
        isAdmin: false,
        isLeagueManager: false,
        balance: INITIAL_BALANCE
    };
    
    const userDoc = db.collection('users').doc(uid);
    await userDoc.set(user);

    const team = generateTeam({
        country: teamCountry
    });

    const batch = db.batch();

    const playersCollection = db.collection('players');
    
    team.forEach(player => {
        const playerDoc = playersCollection.doc();
        batch.set(playerDoc, {
            ...player,
            owner: userDoc
        });
    });

    await batch.commit();
    
    res.json({
        ...(await userDoc.get()).data(),
        team: (await playersCollection.get()).docs.map(doc => doc.data()),
    });
});

app.delete('/:id', authenticate, requireAdmin, async (req, res) => {
    const { id } = req.params;

    await db.collection('users').doc(id).delete();

    res.json({
        success: true,
    })
});

app.put('/:id', authenticate, requireLeagueManager, async (req, res) => {
    const { id } = req.params;
    const { teamName, teamCountry, balance, name, isAdmin, isLeagueManager } = req.body;
    const { isAdmin: userIsAdmin } = req.user;
    
    const userRef = db.collection('users').doc(id);

    const update = {
        teamName,
        teamCountry,
    }

    if (userIsAdmin) {
        update.balance = balance;
        update.name = name;
        update.isAdmin = isAdmin;
        update.isLeagueManager = isLeagueManager;
    }

    userRef.set(update, { merge: true });

    res.json((await userRef.get()).data())
});

app.get('/notifications', authenticate, async (res, req) => {
    const userRef = db.collection('users').doc(uid);

    const notifications = await db.collection('notifications')
        .where('user', '==', userRef)
        .where('read', '==', false)
        .get();

    const users = await Promise.all(
        Array.from(notifications.docs)
            .map(async notification => {
                await notification.set({
                    read: true
                });

                return (await db.collection('players')
                    .get(notification.data().player))
                    .data();
            })
    );
    
    res.json(users);
});

module.exports = app;