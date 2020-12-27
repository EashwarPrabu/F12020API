const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const {signUpValidator, loginValidator} = require('../utils/validator');
const salt = 10;

router.post('/signup', async (req, res) => {
    const {error} = signUpValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        return res.send(`Hey ${savedUser.name}, you have successfully signed up!`);
    } catch(err) {
        return res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const {value: {email, password}, error} = loginValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email});
    if(!user) return res.status(400).send('No such email exists');

    const validUser = await bcrypt.compare(password, user.password)
    if(!validUser) return res.status(400).send('Incorrect password');

    jwt.sign({username: user.name}, process.env.SECRET_KEY, (err, token) => {
        if(!err)
            return res.json({
                'message': 'Login successfull!',
                'auth-token': token
            });
        return res.send('LogIn Failed! Try again!');
    });
});

module.exports = router;