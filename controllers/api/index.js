const router = require('express').Router();
const userRoutes = require('./userRoutes');
const entriesRoutes = require('./entriesRoutes');
const sobrietyProgressRoutes = require('./sobrietyProgressRoutes');


router.use('/users', userRoutes);
router.use('/entries', entriesRoutes);
router.use('/progress', sobrietyProgressRoutes);

module.exports = router;
