const createRoute = require('./createRoute');

const db = require('../db');
const authenticate = require('../db/authenticate');
const generateTeam = require('../helpers/generateTeam');
const { requireLeagueManager } = require('../helpers/auth');

const app = createRoute();

app.get('/', authenticate, requireLeagueManager, async (req, res) => {
    const usersRef = await db.collection('users').get();
    res.json(usersRef.docs.map(user => user.data()));
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

app.put('/:id', authenticate, requireLeagueManager, async (req, res) => {
    const { id } = req.params;
    const { teamName, teamCountry, balance, name, } = req.body;
    const { isAdmin } = req.user;
    
    const userRef = db.collection('users').doc(id);

    const update = {
        teamName,
        teamCountry,
    }

    if (isAdmin) {
        update.balance = balance;
        update.name = name;
    }

    userRef.set(update, { merge: true })
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

                return (await db.collection('players').get(notification.data().player)).data();
            })
    );
    
    res.json(users);
});

module.exports = app;