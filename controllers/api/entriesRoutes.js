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

router.put('/:id', async (req, res) => {
    try {
        const updatedEntry = await Entries.update(req.body, {
            where: { id: req.params.id },
        });
        if (updatedEntry[0] === 0) {
            res.status(404).json({ message: 'Entry not found' });
            return;
        }
        res.status(200).json({ message: 'Entry updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCount = await Entries.destroy({
            where: { id: req.params.id },
        });
        if (deletedCount === 0) {
            res.status(404).json({ message: 'Entry not found' });
            return;
        }
        res.status(204).end(); // No content, successful deletion
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
