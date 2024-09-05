const express = require("express");
const {
  getStudents,
  createStudent,
  deleteStudent,
  UpdateStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.delete("/:id", deleteStudent);
router.put("/:id", UpdateStudent);

module.exports = router;
