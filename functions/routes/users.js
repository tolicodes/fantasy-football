const createRoute = require('./createRoute');

const db = require('../db');
const authenticate = require('../db/authenticate');
const generateTeam = require('../models/generateTeam');

const app = createRoute();

app.get('/', authenticate, async (req, res) => {
    const usersSnap = await db.collection('users').get();
    res.json(usersSnap.docs.map(user => user.data()));
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

module.exports = app;