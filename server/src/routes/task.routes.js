import { Router } from "express";
import pool from "../db.js";
import { createTask, deleteTask, getAllTasks, getTaskByID, updateTask } from "../controllers/task.controller.js";

const router = Router(); 

router.get('/tasks', getAllTasks )

router.get('/task/:id', getTaskByID)

router.post('/tasks', createTask)

router.delete('/task/:id', deleteTask)

router.put('/task/:id', updateTask)



export default router