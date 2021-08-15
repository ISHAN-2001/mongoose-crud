const express = require("express")
const app = express()
// Setting up mongoose and mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test1', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.once("open", function(){
  console.log("Database connected:");
});

db.on("error", err => {
  console.error("connection error:", err);
});

const Student = require("./models/student");



// CRUD operations :--

//Creating a new student and saving it...
app.get("/create/:name1/:age/:address", (req, res) => {

    let s = new Student({
        name: req.params.name1,
        age: req.params.age,
        address: req.params.address
    })


    s.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });

    res.send(req.params);
});

//displayall Student;
app.get("/show-all", (req, res) => {
   
    Student.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

//queryfind();
// if no documents are there then value is null.
// use findOne for single document or find for array of documents
app.get("/find/:name1", (req, res) => {
   
    let name1 = req.params.name1;
    Student.findOne({ name: name1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
    
});

app.get("/findId/:id", (req, res) => {

    let id = req.params.id;
    Student.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/sort", (req, res) => {
    
    Student.find()
        .sort({_id : -1})
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
    
})

app.listen(3000, () => {
    console.log(`App listening at http://127.0.0.1:3000`)
})