const express = require("express");
const router = express.Router();

router.post("/hello", (req, res) => {
  res.json({ message: "Hello from Dummy Backend!", payload: req.body });
});

module.exports = router;
