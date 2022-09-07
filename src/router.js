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
   
    const { username, password, profile} = req.body

     const ValidUsername = username === mockUser.username
     const ValidPassword = password === mockUser.password
    //console.log(mockUser)
    //console.log(ValidUsername)
    //console.log(ValidPassword)
     try {
        if (ValidUsername && ValidPassword) {
            const mockUser = jwt.sign({ username, password, profile}, 'mypassword')
            console.log(mockUser)
            res.json(mockUser)
        }    
        else {
            return res.status(400).json({ msg: "Invalid username or password"})
        }
     } catch (e) {
     res.json( { error: e.message })
    }
});

router.get('/profile', (req, res) => {
  
    //console.log(req.headers)
    //console.log(req.headers.authorization)
    console.log(req.get('authorization'))
    const authorization = req.get('authorization')
    try {
        const profile = jwt.verify(authorization, 'mypassword')
        res.json(profile)
    } catch (err) {
        res.json( { error: e.message } )
    }
});


module.exports = router;
