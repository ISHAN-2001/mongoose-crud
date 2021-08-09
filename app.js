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
function newStudent0() {
    
    const s = new Student({
        name: "Student 1",
        age: 13,
        address: "BBSR"
    });

    s.save(function (error, document) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(document);
        }
    });
}

//newStudent0();

async function newStudent() {
    const s = new Student({
        name: "Student 1",
        age: 13,
        address: "BBSR"
    });

    const document = await s.save();
    console.log(document);
}
// newStudent().catch(err => {
//     console.log(err);
// });
// newStudent(); using async-await


function displayall() {
    Student.find({}, function (err, records) {
        if (err) {
            console.log(err)
        }
        else {
         console.log(records);
        }
    });
}
//displayall();

function queryfind() {
    Student.find({ name: 'Student no. 3' }, function (err, records) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(records);
        }
    });
}
//queryfind();
// if no documents are there then value is null.
// use findOne for single document or find for array of documents

function findAndUpdate0() {
    
    Student.findOne({ name: 'Lipun' }, (err, records) => {
        if (err) {
            console.log(err);
        }
        else {
            records.address = 'tokyo';
            records.save((err, documents) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(documents);
                }
            })
        }
    });
}
// findAndUpdate0();

async function findAndUpdate() {
    const s = await Student.findOne({ name: 'Sipun' });
    // console.log(s);
    s.address = 'New York';
    const s1 = await s.save();
    // console.log(s1);
}
// findAndUpdate().catch(error => {
//     console.log(error);
// })
// findAndUpdate();  // using async-await


async function findAndRemove() {
    let s = await Student.findOne({ name: 'Student no. 1' });
    let deleted = await Student.deleteOne(s);
}
// findAndRemove().catch(err => {
//     console.log(err);
// });
// findAndRemove();  // using async-await