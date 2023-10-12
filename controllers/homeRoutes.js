const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('login', { 
   
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/homepage', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
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
    req.session.user_id = /* Set the user's ID here */
    res.redirect('/homepage'); // Redirect to the home page
  } else {
    // Handle authentication failure, e.g., show an error message
  }

// Define the route to handle the login form submission
  try {
    // You should implement user authentication here.
    // For example, query your database to check if the provided username and password are valid.
    const user = await User.findOne({
      where: {
        username: username,
        password: password, // This is just a simple example; you should hash the password in practice.
      },
    });

    if (user) {
      // Successful authentication - set the session variable to indicate the user is logged in
      req.session.logged_in = true;
      req.session.user_id = user.id;
      res.redirect('/homepage'); // Redirect to the home page
    } else {
      // Authentication failed - display an error message
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    // Handle any errors that occur during authentication
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Other routes and middleware definitions...

module.exports = router;



module.exports = router;
