const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const connectionStr = "mongodb://localhost:27017";

const client = new MongoClient(connectionStr, { useUnifiedTopology: true });

client.connect(function (err) {
  const db = client.db("testdb");

  const people = db.collection("people");

  people.insertOne({ name: "Ivan" }, (err, result) => {
    people.find().toArray((err, data) => {
      console.log(data);
    });
  });
});

///////////////////////////////////////
//Module
const mongoose = require("mongoose");

//Connect
mongoose.connect("mongodb://localhost:27017/unidb");

//Mongoose Model
const exampleSchema = new mongoose.Schema({
  propString: String,
  propNumber: Number,
  propObject: {},
  propArray: [],
  propBool: Boolean,
});

const Model = mongoose.model("Example", exampleSchema);

//Model Methods
const studentSchema = new mongoose.Schema({…});
studentSchema.methods.getInfo = function() {
return `I am ${this.firstName} ${this.lastName}`;
};

//Property Validation
studentSchema.path('firstName').validate(function () {
    return this.firstName.length >= 2
    && this.firstName.length <= 10
}, 'First name must be between 2 and 10 symbols long!')

//Export Modules
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

firstName: { type: String, required: true },

lastName: { type: String, required: true },

facultyNumber: { type: String, required: true, unique: true },

age: { type: Number }

});

module.exports = mongoose.model('Student', studentSchema);

const Student = require('./models/Student');


//CRUD in Monogoose
const Student = new Student({...})
// - create (presist)
Student.save();
// - read 
Student.find();
// - update
Student.findByIdAndUpdate(id, {$set: {prop: newVal}}, callback);
Student.update({_id: id, {$set: {prop: newVal}}, callback)
// - delete
Student.findByIdAndRemove(id, callback)
Student.remove({name: studentName})


////////////////////////////////////
// Example Create
const mongoose = require('mongoose');

const connectionStr = 'mongodb://localhost:27017/unidb';

const studentSchema = new mongoose.Schema({

name: { 
    type: String,
     required: true,
      minlength: 3 },

age: {
     type: Number }

});

const Student = mongoose.model('Student', studentSchema);

mongoose.connect(connectionStr).then(() => {

new Student({ name: 'Petar', age: 21 })

.save()

.then(student => {

console.log(student._id)

});

});


//Read Examples
Student.find({}).then(students => console.log(students)).catch(err => console.error(err))

Student.find({name: 'Petar'}).then(students => console.log(students)) //always handle errors

Student.findOne({name: 'Petar'}).then(student => console.log(student))

//Update exaple
Student.findById('57fb9fe1853ab747b0f692d1').then((student) => {
    student.firstName = 'Stamat'
    student.save()
});

Student.findByIdAndUpdate('57fb9fe90cd76e4e2c59e1a2', {
    $set: { name: 'Stamat' }
});

Student.update(
    { firstName: 'Kiril' },
    { $set: { name: 'Petar' } },
    { multi: true }
)

//Remove Example
Student.findByIdAndRemove('57fb9fe1853ab747b0f692d1')

Student.remove({ name: 'Stamat' })

Student.count().then(console.log)

Student.count({ age: { $gt: 19 } }).then(console.log)


//Mongoose Queries
// - instead of
{
    $or: [
    {conditionOne: true},
    {conditionTwo: true}
    ]
}
// - do
.where({ conditionOne: true })
.or({ conditionTwo: true })

//  - equality/non-equality
Student.findOne({'lastName':'Petrov'})
Student.find({}).where('age').gt(7).lt(14)
Student.find({}).where('facultyNumber').equals('12399')

// - some properties
Student.findOne({'lastName':'Kirilov'}).select('name age')


// - sorting
Student.find({}).sort({age:-1})

// - limit and skip
Student.find({}).sort({age:-1}).skip(10).limit(10)

Student.find({})
.where('firstName').equals('gosho')
.where('age').gt(18).lt(65)
.sort({age:-1})
.skip(10)
.limit(10)



