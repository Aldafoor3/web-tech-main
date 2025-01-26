const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    /* The ID is auto generated in the database by Mongoose*/

    /* The type of the task can be one of the 6 types:
    "bin-dec", "bin-hex", "dec-bin", "dec-hex", "hex-bin", "hex-dec"
    The type is used to calculate the number of finished tasks
    per type */
    type: {type: String, required: true},

    /* Followed the structure of the mock JSON defined by Firas in
    https://git.uni-due.de/spfikham/web-tech/-/blob/ergebnisse/src/app/results/results.component.ts?ref_type=heads */
    tasks: [{
        index: {type: Number, required: true},

        /* Stores the source number the user has to convert from */
        taskName: {type: String, required: true},

        /* A user can submit with some fields left blank, and this produces
        empty strings in givenAnswer. however unlike in JS/TS for Mongoose an
        empty string ("") is treated like undefined/null when checking if the value
        exists. Setting required:true would give errors when a user leaves fields blank */
        givenAnswer: {type: String, required: false},

        /* Stores the solution that is expected */
        correctAnswer: {type: String, required: true}

        /* The correct property will be calculated for the frontend using
        givenAnswer == correctAnswer. Defining it directly would
        violate the 3rd Normal Form in DBMS */
    }]
});

module.exports = mongoose.model("Task", taskSchema)