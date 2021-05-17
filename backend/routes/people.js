const express = require("express");
const cors = require("cors");
const router = express.Router();
const Person = require("../models/person");
router.use(cors());
router.use(express.json());

// Mongoose setup
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/crm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB...");
});

function createCourse(req) {
  const person = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    organisation: req.body.organisation,
    department: req.body.department,
    email: req.body.email,
    phoneWork: req.body.phoneWork,
    phoneMobile: req.body.phoneMobile,
  });

  const result = person.save(function (err) {
    if (err) return console.error(err);
  });
  console.log(result);
}

function getPeople() {
  return Person.find();
}

function getPerson(personId) {
  return Person.findById(personId);
}

// return all the people in the DB
router.get("/", async (req, res) => {
  const people = await getPeople();
  res.json(people);
});

// get a person by their ID
router.get("/:id", async (req, res) => {
  try {
    const person = await getPerson(req.params.id);
    res.json(person);
  } catch (err) {
    res.status(404).send("The person with the given ID was not found.");
    //res.json({ message: err });
  }
});

// create a new person profile
router.post("/", async (req, res) => {
  try {
    const newCourse = await createCourse(req);
    res.json(newCourse);
  } catch (err) {
    res.status(400).send("There was a problem creating the new user");
  }
});

// delete a person
router.delete("/:id", async (req, res) => {
  try {
    const removedPerson = await Person.deleteOne({ _id: req.params.id });
    res.json(removedPerson);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedPerson = await Person.updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          jobTitle: req.body.jobTitle,
          role: req.body.role,
          organisation: req.body.organisation,
          department: req.body.department,
          email: req.body.email,
          phoneWork: req.body.phoneWork,
          phoneMobile: req.body.phoneMobile,
        },
      }
    );
    res.json(updatedPerson);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
