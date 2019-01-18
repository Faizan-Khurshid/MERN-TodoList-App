const express = require("express")
const router = express.Router();
const Todos = require("../model/todos")

router.post("/add", (req, res) => {
    console.log("This is add request");
    console.log("request.body", req.body)
    const todo = new Todos(req.body)

    todo.save()
    .then(() => res.send("todo inserted succesdully"))
    .catch(e => res.send("e", e.message))

})

router.use("/fetchTodos", (req, res) => {
    console.log("this is fetchtodos request")
    Todos.find({})
    .then(result => res.send(result))
    .catch(e => res.send(e.message))
})

router.delete("/deleteTodo", (req, res) => {
    console.log("this is delete Todo request")
    Todos.deleteOne({_id : req.body.id})
    .then(() => res.send("todo deleted successfully"))
    .catch(e => res.send(e.message))
})

router.put("/updateTodo", (req, res) => {
    console.log("this is update Todo request")
    Todos.updateOne({_id : req.body.id}, { $set : { todo : req.body.updatedTodo } })
    .then(() => res.send("todo updated successfully"))
    .catch(e => res.send(e.message))
})

module.exports = router