const router = require('express').Router();
// const Takes  = require('../models/Takes');
// const Users = require('../models/takeUsers');
const { Users, Takes } = require('../models')

// Render the Main page of Takes.
router.get('/', async (req, res) => {
	try {
		const dbTakesData = await Takes.findAll({
			include: [{model: Users }],
			
		});

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


// Render dashboard page when the user is signed in and clicks loge.

router.get('/dashboard', async (req, res) => {
	const dbTakesData = await Takes.findAll({
		where: {
			user_id: req.session.userId
		}
	});
	// const dbUserId = await User.findByPk(
	// 	req.session.userId
		
	// );
	// setTimeout(() => {console.log("User Takes:",dbTakesData)}, 3000)
	const userTakes = dbTakesData.map((blog) => blog.get({ plain: true }));
	console.log("User Takes:", userTakes)
	
	try {
		res.render('profile', {
			isMember: req.session.isMember,
			userTakes,
			theUserId: req.session.userId,
			theUser: req.session.user,
			
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
