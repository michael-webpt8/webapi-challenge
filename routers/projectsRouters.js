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

/**
 * POST
 * ENDPOINT: `/projects`
 */
router.post('/', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: 'Please enter a Name.' });
  }
  if (!req.body.description) {
    return res.status(400).json({ message: 'Please enter a Description.' });
  }
  const projectMessage = {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed || false
  };

  projectDb
    .insert(projectMessage)
    .then(messagePost => {
      res.status(201).json(messagePost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Server error Posting Message' });
    });
});

/**
 * UPDATE
 * ENDPOINT: `/projects`
 */
router.put('/:id', (req, res) => {
  const id = req.params.id;
  projectDb.get(id).then(project => {
    if (!project) {
      return res.status(404).json({ message: 'Did not find project ID' });
    }
    if (!req.body.name) {
      return res.status(400).json({ message: 'Please enter a Name.' });
    }
    if (!req.body.description) {
      return res.status(400).json({ message: 'Please enter a Description.' });
    }
    const updateMessage = {
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed || false
    };
    projectDb
      .update(id, updateMessage)
      .then(update => {
        res.status(201).json(update);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ errorMessage: 'Server error Updating Project Message' });
      });
  });
});

module.exports = router;
