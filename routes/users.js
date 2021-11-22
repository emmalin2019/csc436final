var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Todo = require('../models/Todo');

const privateKey = process.env.JWT_PRIVATE_KEY;

router.use(function(req, res, next) {
    if (req.header("Authorization")) {
        try {
            req.payload = jwt.verify(req.header("Authorization"),
			privateKey, {algorithms: ['HS256']})
		  // algorithms: ['RS256'] 
	  } catch(error) {
            return res.status(401).json({"error": error.message});
        }
    } else {
        return res.status(401).json({"error": "Unauthorized"});
    }
    next()
})

router.get('/', async function(req, res, next) {
    const users = await User.find({}).exec()
    return res.status(200).json({"users": users})
});


router.get('/:userid/todos', async function(req, res, next) {
    const todos = await Todo.find().where('author').equals(req.params.userid).exec()
    return res.status(200).json({"todos": todos})
});

module.exports = router;
