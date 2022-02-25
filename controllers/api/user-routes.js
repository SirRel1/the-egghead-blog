const router = require('express').Router();
const takeUsers = require('../../models/takeUsers.js');
const Takes = require('../../models/Takes.js');
const bcrypt = require('bcrypt');

// Get all Users from the database.

router.get('/', async (req, res) => {
	const allUsers = await takeUsers.findAll({});

	res.status(200).json(allUsers);
});

// Get User by Id
router.get('/:id', async (req, res) => {
	const idUser = await takeUsers.findOne({
		where: {
			id: req.params.id,
		},
	});

	!idUser
		? res.status(404).json({ message: 'No User with that ID' })
		: res.status(200).json(idUser);
});

// Delete User by Id
router.delete('/:id', async (req, res) => {
	const delUser = await Takes.destroy({
		where: {
			id: req.params.id,
		},
	});

	!delUser
		? res.status(404).json({ message: 'No User with that ID' })
		: res.status(200).json({message: `You deleted User ${req.params.id}`});
});

// Register new user to Takes site!

router.post('/register', async (req, res) => {
	// const { username, email, password} = req.body
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	try {
		const dbUserData = await takeUsers.create({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});
		const cleanUser = dbUserData.get({ plain: true });
		req.session.save(() => {
			req.session.isMember = true
			req.session.user = req.body.username
		})
		res.status(200).send("Enter");
	} catch (err) {
		res.status(500).json(err);
	}
});

// Login in current User, check database if exist.

router.post('/login', async (req, res) => {
	try {
		const userExist = await takeUsers.findOne({
			where: {
				email: req.body.email,
			},
		});
		const cleanUserLogin = await userExist.get({ plain: true });
		req.session.save(() => {
			req.session.isMember = true;
			req.session.user = cleanUserLogin.username;
		})

		if (!cleanUserLogin) {
			return res.status(404).json({ message: 'Email or password incorrect' });
		}

		const validPass = await bcrypt.compare(
			req.body.password,
			userExist.password
		);
		if (!validPass) {
			return res.status(400).send('Invalid Password');
		}
		
		return res.status(200).send('Welcome!');
	} catch (err) {
		return res.status(500).json(err);
	}
});

// Recieve new post and persist the data into the database.
router.post('/post', async (req, res) => {
    const newPost = await Takes.create({
        title: req.body.title,
        description: req.body.description
    })

    res.status(200).json(newPost)
})

// Delete the blog selected by the user

router.delete('/post/:id', async (req, res) => {
    const newPost = await Takes.destroy({
        where: {
			id: req.params.id
		}
    })

    res.status(200).json(newPost)
})

router.post('/logout', (req, res) => {
	if (req.session.isMember) {
	  req.session.destroy(() => {
		res.status(204).end();
	  });
	} else {
	  res.status(404).end();
	}
  });

module.exports = router;
