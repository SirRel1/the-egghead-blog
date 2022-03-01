const router = require('express').Router();
// const takeUsers = require('../../models/takeUsers.js');
// const Takes = require('../../models/Takes.js');
const { Takes, Users, Comments } = require('../../models')
const bcrypt = require('bcrypt');

// Get all Users from the database.

router.get('/', async (req, res) => {
	const allUsers = await Users.findAll({});

	res.status(200).json(allUsers);
});

router.get('/post/:id', async (req, res) => {
    const selectPost = await Takes.findOne({
        where: {
			id: req.params.id
		},
		include: [{model: Users }]
    })
	const cleanBlog = await selectPost.get({ plain: true });
	
	
    return res.status(200).json({cleanBlog})
})

// Get User by Id
router.get('/:id', async (req, res) => {
	const idUser = await Users.findOne({
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
		const dbUserData = await Users.create({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});
		const cleanUser = dbUserData.get({ plain: true });
		req.session.save(() => {
			req.session.isMember = true
			req.session.user = req.body.username
			req.session.userId = cleanUser.id;
		})
		res.status(200).send("Enter");
	} catch (err) {
		res.status(500).json(err);
	}
});

// Login in current User, check database if exist.

router.post('/login', async (req, res) => {
	try {
		const userExist = await Users.findOne({
			where: {
				email: req.body.email,
			},
		});
		const cleanUserLogin = await userExist.get({ plain: true });
		req.session.save(() => {
			req.session.isMember = true;
			req.session.user = cleanUserLogin.username;
			req.session.userId = cleanUserLogin.id;
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
		user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
		created_at: req.body.created_at
    })

    res.status(200).json(newPost)
})

// Recieve and create comments from and to Users
router.post('/comments', async (req, res) => {
    const newComment = await Comments.create({
		user_id: req.body.user_id,
        to_whom: req.body.to_whom,
        to_what: req.body.to_what,
        description: req.body.description
    })
	const cleanComments = await newComment.get({ plain: true });

    res.status(200).json(cleanComments)
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


router.put('/post/:id', async (req, res) => {
    const newPost = await Takes.update({
		user_id: req.session.userId, 
		title: req.body.title,
		description: req.body.description},
		{ where: {
			id: req.params.id
		},
        
		})

    res.status(200).json({newPost})
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
