const express  = require("express");
const { getTodos, postTodos } = require("../controller/todos");

const router = express.Router();

router.get("/todos",getTodos);
router.post("/todos",postTodos);

module.exports = router;