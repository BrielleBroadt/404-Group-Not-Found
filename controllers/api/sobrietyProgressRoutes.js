const router = require('express').Router();
const { SobrietyProgress } = require('../../models');


router.post('/', async (req, res) => {

    console.log(req.session.user_id)

    const moneySaved = req.body.boosAmount;
    const daysSober = req.body.daysSober;

    const data = {"days_sober": daysSober, "money_saved": moneySaved, "user_id": req.session.user_id}

    try {
        const newProgress = await SobrietyProgress.create(data);
        res.status(201).json(newProgress);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const progressEntries = await SobrietyProgress.findAll();
        res.status(200).json(progressEntries);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedProgress = await SobrietyProgress.update(req.body, {
            where: { id: req.params.id },
        });
        if (updatedProgress[0] === 0) {
            res.status(404).json({ message: 'Sobriety progress entry not found' });
            return;
        }
        res.status(200).json({ message: 'Sobriety progress entry updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCount = await SobrietyProgress.destroy({
            where: { id: req.params.id },
        });
        if (deletedCount === 0) {
            res.status(404).json({ message: 'Sobriety progress entry not found' });
            return;
        }
        res.status(204).end(); // No content, successful deletion
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
