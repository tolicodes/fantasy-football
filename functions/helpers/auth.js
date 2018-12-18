const db = require('../db');

const requireLeagueManager = async (req, res, next) => {
    const { user } = req;

    if (!user.isAdmin && !user.isLeagueManager) {
        res.status(403).json({ 
            message: 'You must be an admin or league manager'
        });
    }

    next();
}

const requireAdmin = async (req, res, next) => {
    const { user } = req;

    if (!user.isAdmin) {
        res.status(403).json({ 
            message: 'You must be an admin'
        });
    }

    next();
}

module.exports = {
    requireAdmin,
    requireLeagueManager,
};
