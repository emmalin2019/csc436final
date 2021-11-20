const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User'}
    complete: {type: Boolean, required: true, default: false},
	dateCompleted: {type: Number, required: true, default: -1},
	hidden: {type: Boolean, required: true, default: false},
  }
);
	//~ "id": 1,
      //~ "complete": true,
      //~ "dateCompleted": 1634955756559,
      //~ "title": "i",
      //~ "description": "iujiuh",
      //~ "author": "a",
      //~ "dateCreated": 1634873345765,
      //~ "hidden": false

//Export model
module.exports = mongoose.model('Todo', TodoSchema);

