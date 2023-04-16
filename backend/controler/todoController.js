const Todo = require("../model/Todo");
const { validationResult } = require("express-validator")

exports.getAllTodos = async(req, res) => {
    try {
        const result = await Todo.find()
        res.json({
            message: "fetched all todo",
            result
        })
    } catch (error) {
        console.log(error);
        res.json({ message: "error", error })
    }
}

exports.addTodos = async(req, res) => {
    try {
        const { errors } = validationResult(req)
        if (errors.length > 0) {
            let msg = ""
            errors.forEach(err => {
                msg += `${err.value} : ${err.msg}`
            })
            return res.json({
                message: msg,
            })
        }
        const result = await Todo.create(req.body)
        console.log(req.body);
        res.json({
            message: "added todo",
        })
    } catch (error) {
        console.log(error);
        res.json({ message: "error", error })
    }
}

exports.deleteTodos = async(req, res) => {
    try {
        const { tid } = req.params
        const result = await Todo.findByIdAndDelete(tid)
        res.json({
            message: "deleted todo"
        })
    } catch (error) {
        res.json({
            message: "deleted todo",
        })
    }
}

exports.updateTodos = async(req, res) => {
    try {
        const { todoId } = req.params
        const result = await Todo.findByIdAndUpdate(todoId, req.body, { new: true })
        res.json({
            message: "update todo",
            result
        })
    } catch (error) {
        console.log(error);
        res.json({ message: "errror", error })
    }

}