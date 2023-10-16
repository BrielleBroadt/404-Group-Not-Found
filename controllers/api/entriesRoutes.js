const router = require('express').Router();
const { Entries } = require('../../models');

router.post('/', async (req, res) => {
  try {
      const entriesData = await Entries.create(req.body);
      res.status(201).json(entriesData);
  } catch (err) {
      res.status(400).json(err);
  }
});

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
