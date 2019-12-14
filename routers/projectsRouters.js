const express = require('express');
const projectDb = require('../data/helpers/projectModel');
const actionsRouter = require('../routers/actionsRouter');

const router = express.Router();

router.use('/', actionsRouter);

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

/**
 * DELETE
 *
 */
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  projectDb.get(id).then(deleteProject => {
    if (!deleteProject) {
      res.status(404).json({ message: 'Sorry did not find ID to Delete' });
    }
    projectDb
      .remove(id)
      .then(removed => {
        res.status(200).json(removed);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'Item was not removed' });
      });
  });
});

/**
 * GET ID
 * endpoint: `/project/:id`
 */
router.get('/:id', (req, res) => {
  const id = req.params.id;
  projectDb
    .get(id)
    .then(project => {
      if (!project) {
        return res.status(404).json({ message: 'Message with ID not found' });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: 'Server error getting Message with ID' });
    });
});

module.exports = router;
