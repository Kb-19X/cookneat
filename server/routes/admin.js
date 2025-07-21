const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');

router.get('/dashboard', isAdmin, (req, res) => {
  res.json({ message: 'Bienvenue admin !', user: req.user });
});

module.exports = router;
