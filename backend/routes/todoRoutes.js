const { getAllTodos, addTodos, deleteTodos, updateTodos } = require("../controler/todoController")

const router = require("express").Router()
const { body } = require("express-validator")
router
    .get("/", getAllTodos)
    .post("/add-todo", [
        body("task", "task must be more than 10 characther").isLength({ min: 2 }),
        body("priority", "priority msust be 1 to 3").isLength({ min: 1, max: 3 }),

    ], addTodos)
    .delete("/destroy/:tid", deleteTodos)
    .put("/modity/:todoId", updateTodos)

module.exports = router