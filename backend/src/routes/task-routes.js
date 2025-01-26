const express = require("express");
const { getAllTasks, createTask, pushAnswerToTask, getAnswersOfTaskByID, getTypeOfTaskByID } = require("../controllers/task-controller"); 

const router = express.Router();

router.get("/get-all-tasks", getAllTasks); 
router.post("/create-task", createTask);
router.put("/push-answer", pushAnswerToTask);
router.get("/get-answers-of-task-by-id", getAnswersOfTaskByID)
router.get("/get-type-of-task-by-id", getTypeOfTaskByID)

module.exports = router;