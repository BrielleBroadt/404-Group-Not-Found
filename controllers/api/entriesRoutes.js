const router = require('express').Router();
const { Entries } = require('../../models');

router.get('/entries', async (req, res) => {
    try {
      // Fetch data from the Entries model
      const entries = await Entries.findAll();
      // Send the data as a response
      res.json(entries);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
