const router = require('express').Router();
const { User, Entries, SobrietyProgress } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('login', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });
    const entriesData = await Entries.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    console.log(entriesData); // Add this line to check the retrieved data
    const entries = entriesData.get({ plain: true });

    res.render('profile', {
      ...user,
      entries,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Perform user authentication here (check the username and password)

  // If authentication is successful, set the session variable
  if (authenticationIsSuccessful) {
    req.session.logged_in = true;
    req.session.user_id =
      /* Set the user's ID here */
      res.redirect('/returningUser'); // Redirect to the home page
  } else {
    // Handle authentication failure, e.g., show an error message
  }

  // Define the route to handle the login form submission
  try {
    const user = await User.findOne({
      where: {
        username: username,
        password: password,
      },
    });

    if (user) {
      req.session.logged_in = true;
      req.session.user_id = user.id;
      res.redirect('/returningUser'); // Redirect to the home page
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    // Handle any errors that occur during authentication
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Other routes and middleware definitions...
router.get('/newuser', (req, res) => {
  res.render('newuser');
});

router.get('/returningUser', async (req, res) => {

  try {
    const sobrietyData = await SobrietyProgress.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });


  
    const dataObj = { 
      daysSober: sobrietyData[0].dataValues.days_sober,
      moneySaved: sobrietyData[0].dataValues.money_saved
     };

     console.log(dataObj)

    res.render('returningUser', { data: {daysSober: dataObj.daysSober, moneySaved: dataObj.moneySaved} });
  } catch (error) {
    // Handle errors if any
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
