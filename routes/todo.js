var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');

const privateKey = process.env.JWT_PRIVATE_KEY;

router.use(function(req, res, next) {
      console.log(req.header("Authorization"))
      if (req.header("Authorization")) {
          try {
              req.payload = jwt.verify(req.header("Authorization"),
				privateKey, {algorithms: ['HS256']})
              console.log(req.payload)
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
    const todos = await Todo.find().where('author').equals(req.payload.id).exec()
    return res.status(200).json({"todos": todos})
});

router.get('/:todoId', async function(req, res, next) {
    //const posts = await Post.find().where('author').equals(req.payload.id).exec()
    
    //mongoose find query to retrieve post where postId == req.params.postId
    const todo = await Todo.findOne().where('_id').equals(req.params.todoId).exec()
    
    return res.status(200).json(todo)
});

router.post('/', async function (req, res) {
	const todo = new Todo({
		"title": req.body.title,
		"description": req.body.description,
		"author": req.payload.id
	})

    await todo.save().then( savedTodo => {
        return res.status(201).json({
            "id": savedTodo._id,
            "title": savedTodo.title,
            "description": savedTodo.description,
            "author": savedPost.author
        })
    }).catch( error => {
        return res.status(500).json({"error": error.message})
    });
})

module.exports = router;
