const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

/**
 * GET
 * ENDPOINT: `/projects`
 */
router.get('/', (req, res) => {
  projectDb
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'server error retrieving Projects' });
    });
});

module.exports = router;
