var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const saltRounds = 10;

const privateKey = process.env.JWT_PRIVATE_KEY;

router.use(function(req, res, next) {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        req.hashedPassword = hash;
        next();
    });
  });
})

router.post('/login', async function(req, res, next) {
  if (req.body.username && req.body.password) {
    
    const user = await User.findOne().where('username').equals(req.body.username).exec()
	
	//console.log(user);
	//console.log('----', await bcrypt.compare(req.body.password, user.password));//, req, res, next, user);
	
    if (user) {
      return await bcrypt.compare(req.body.password, user.password).then(result => {
		  console.log('----');
        if (result === true) {
			console.log('----1',user,privateKey,jwt);
			//const p = `-----BEGIN PUBLIC KEY-----
//~ MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApieSEJk3rt9MTZx5NljR
//~ WVujGbHDhVngYQOVkeuIXelOS45vJ6zaQOJIt5BJV7W9FEWz6uxM+nWCnikL4Jvi
//~ FZdIAbDuqdk/SLUW2lU6JjjpQy2IwXmIIJngUG8r3InEtVoepH3rFdFeWbfzf5sg
//~ OwzrmpcHITROhGTRKRQNERM/wZqq7GujP727qLlipI4CWC+5fn6oEcLvG2z1sK9C
//~ f1JEukcYOUgz3dTbFtoQYdllwxm7kziSbeShcRRtAveWQ43yhXdl8hH1nIv0isJI
//~ E7N/lpSy5CPITxTXgSzbJmIJCKjhu6y8OGQwzHJywDOh/vszTMr2rxjfOriuA5Ho
//~ KQIDAQAB
//~ -----END PUBLIC KEY-----`;//privateKey
          const token = jwt.sign({ id: user._id }, privateKey, { algorithm: 'RS256' });
          console.log('----2');
          return res.status(200).json({"access_token": token});
        } else {
			console.log('----3');
          return res.status(401).json({"error": "Invalid credentials."})
        }
      }).catch(error => {
        return res.status(500).json({"error": error.message})
      });
    }

    return res.status(401).json({"error": "Invalid credentials."})

  } else {
    res.status(400).json({"error": "Username or Password Missing"})
  }
});

router.post('/register', async function(req, res, next) {
	console.log('xxx',req,res,next);
  if (req.body.username && req.body.password && req.body.passwordConfirmation) {
    if(req.body.password === req.body.passwordConfirmation) {
      const user = new User({
        "username": req.body.username,
        "password": req.hashedPassword
      })
          
      return await user.save().then( savedUser => {
        console.log()
        return res.status(201).json({
          "id": savedUser._id,
          "username": savedUser.username
        })
      }).catch( error => {
        return res.status(500).json({"error": error.message})
      });
    }
    res.status(400).json({"error": "Passwords not matching"})
  } else {
    res.status(400).json({"error": "Username or Password Missing"})
  }
})

module.exports = router;
