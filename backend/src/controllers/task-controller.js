const Task = require("../models/task-model")


/* Returns the list of all tasks in the database
Relevant for calculating the stats */
exports.getAllTasks = async (_, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error){
        console.error("Error fetching the list of all tasks");
        return res.status(500).json({
            message: "Server error", error
        })
    }
}

/* Creates a task in the database if one is started by selecting
a conversion mode in the homepage */
exports.createTask = async (req, res) => {
    try{
       const {body} = req;
       const {type} = body;

       if(["bin-dec", "bin-hex", "dec-bin", "dec-hex", "hex-bin", "hex-dec"]
        .includes(type.toLowerCase())){
            const newTask = await Task.create({
                type,
                tasks: [],
            });
            res.status(201).json({
                message: "Task successfully created",
                taskID: newTask._id
            })
        } else {
            res.status(400).json({
                message: "Invalid type selected in POST request"
            })
        }


    } catch (error){
        console.error("Error creating new task");
        return res.status(500).json({
            message: "Server error", error
        })
    }
}

/* Pushes one answer to the task when submitting */
exports.pushAnswerToTask = async (req, res) => {

    try{
        const {body} = req;
        const {taskID, taskName, givenAnswer, correctAnswer} = body;

        const selectedTask = await Task.findById(taskID);

        if(selectedTask){
        const currentAnswerList = selectedTask.tasks;
        const currentAmountOfAnswers = currentAnswerList.length
        currentAnswerList.push({
            index: currentAmountOfAnswers+1,
            taskName,
            givenAnswer,
            correctAnswer
        })

        await selectedTask.save();
        res.status(201).json({
            message: "Successfully pushed answer to task"
        });
    } else {
        res.status(400).json({
            message: "Task to push answer into does not exist"
        })
    }

    } catch(error){
        console.error("Error pushing answer")
        res.status(500).json({
            message: "Server error", error
        })
    }

}

/* This controller returns the answers submitted of the task 
with given taskID */
exports.getAnswersOfTaskByID = async (req, res) => {
    try {
        const { taskID } = req.query; 
        const foundTask = await Task.findById(taskID);

        if (foundTask) {
            res.status(200).json({ answers: foundTask.tasks }); 
        } else {
            res.status(400).json({ message: "Task with specified ID not found" });
        }
    } catch (error) {
        console.error("Error retrieving answers for the task");
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getTypeOfTaskByID = async(req, res) => {
    const { taskID } = req.query; 
    const foundTask = await Task.findById(taskID);
    try{
        if (foundTask) {
            res.status(200).json({ type: foundTask.type }); 
        } else {
            res.status(400).json({ message: "Task with specified ID not found" });
        }
    } catch (error) {
        console.error("Error retrieving type of the task");
        res.status(500).json({ message: "Server error", error });
    }
}