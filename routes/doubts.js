const express = require("express");
const router = express.Router();

const {postDoubt, getDoubts, respondToDoubt} = require("../controllers/doubts");

router.post("/api/doubts", postDoubt);
router.get("/api/doubts", getDoubts);
router.post("/api/doubts/:id/respond", respondToDoubt);

module.exports = router;
