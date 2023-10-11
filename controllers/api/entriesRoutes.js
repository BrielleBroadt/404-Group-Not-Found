const router = require('express').Router();
const { Entries } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const { per_day, cost_each, user_id } = req.body;

        const newEntry = await Entries.create({
            per_day,
            cost_each,
            user_id,
        });
        res.status(200).json(newEntry);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const entries = await Entries.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
