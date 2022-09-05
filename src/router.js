const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {
    //console.log(req.body)

    const { username, password, profile } = req.body
    const { firstName, lastName, age} = req.body

    const token = jwt.sign({ username: 'authguy', profile: {
        firstName: 'Chris',
        lastName: "Wolstenholme",
        age: 43
    } }, 'mypassword',)

    res.json(token)

});

router.get('/profile', (req, res) => {
  
    //console.log(req.headers)
    //console.log(req.headers.authorization)

    const newToken = req.headers.authorization

    console.log(newToken)
    // try {
    //     const result = jwt.verify(token, newToken)
    // } catch (e) {
    //     return false
    // }
    // res.json(result)
});


module.exports = router;
