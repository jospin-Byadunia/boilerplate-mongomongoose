require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});;

const personSchema = new mongoose.Schema({
  name:{type:String,
    required:true
  },
  age:Number,
  favoriteFoods:[String]
})

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const jospin = new Person({name:"jospin", age:10, favoriteFoods:["fish, cabages, dodo"]});
  jospin.save((err, data)=>{
    if(err) return console.error(err)
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  const peopleInstance = Person.create(arrayOfPeople,  ((err, data)=>{
    if(err) return console.error(err);
    done(null, data);
  }));
  ((err, data)=>{
    if(err) return console.error(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, personFound)=>{
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:[food]}, (err, personFound)=>{
    if(err) return console.log(err);
    done(null, personFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound)=>{
    if(err) return console.log(err);
    done(null, personFound)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, personFound)=>{
    if(err) return console.log(err);
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson)=>{
    if(err) return console.log(err)
    done(null, deletedPerson);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedPerson)=>{
    if(err) return console.log(err);
    done(null, removedPerson);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name:1}).limit(2).select({age:0}).exec((err, person)=>{
    if(err) return console.log(err)
    done(null,person);
  })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
