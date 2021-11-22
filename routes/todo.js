var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
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
    const todos = await Todo.find().where('author').equals(req.payload.id).exec()
    return res.status(200).json({"todos": todos})
});

router.get('/:todoId', async function(req, res, next) {
    
    //mongoose find query to retrieve post where postId == req.params.postId
    const todo = await Todo.findOne().where('_id').equals(req.params.todoId).exec()
    
    return res.status(200).json(todo)
});

router.delete('/:todoId', async function(req, res, next) {
    
    const dc = await Todo.deleteOne({ // returns {deletedCount: 1}
		_id: req.params.todoId, author: req.payload.id
	});
    
    return res.status(200).json(dc);
});

router.patch('/:todoId/:completed', async function(req, res, next) {
    let t = (req.params.completed == 'true') ? Date.now() : -1;
    let c = (req.params.completed == 'true') ? true : false;
	let uc = await Todo.updateOne(
		{_id: req.params.todoId, author: req.payload.id}, 
		{completed: c, dateCompleted: t}
	);
    
    return res.status(200).json(
		{completed: c, dateCompleted: t, updateCount: uc}
	);
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
            "author": savedTodo.author
        })
    }).catch( error => {
        return res.status(500).json({"error": error.message})
    });
})

module.exports = router;
