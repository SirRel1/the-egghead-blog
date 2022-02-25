const router = require('express').Router();
const Takes = require('../models/Takes.js');

// Render the Main page of Takes.
router.get('/', async (req, res) => {
	try {
		const dbTakesData = await Takes.findAll({});

		const theTakes = dbTakesData.map((blog) => blog.get({ plain: true }));
	

		res.render('homepage', {
			theTakes,
			isMember: req.session.isMember,
			theUser: req.session.user
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Render registration page.
router.get('/register', async (req, res) => {
	try {
		res.render('register');
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Render Login page.
router.get('/login', async (req, res) => {
	try {
		if(req.session.isMember) {
			res.redirect('/') 
		} 
		res.render('login');
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});


// Render profile page when the user is signed in and clicks loge.

router.get('/profile', async (req, res) => {
	try {
		res.render('profile');
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
