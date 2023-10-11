const router = require('express').Router();
const { SobrietyProgress } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newProgress = await SobrietyProgress.create(req.body);
        res.status(201).json(newProgress);
    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router;
