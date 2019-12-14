const express = require('express');
const actionDb = require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router({
  mergeParams: true
});

/**
 * GET
 * ENDPOINT: `/projects/:id/actions`
 */
router.get('/:id/actions', (req, res) => {
  const id = req.params.id;
  const actionId = req.params.actionId;
  actionDb.get(id).then(data => {
    if (!data) {
      return res.status(404).json({ message: 'Could not find ID for Action' });
    }
    actionDb
      .get(actionId)
      .then(post => {
        console.log('post', post);
        console.log('data', data);
        res.status(200).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'Error getting Action Message' });
      });
  });
});

/**
 * UPDATE
 * ENDPOINT: `/projects/:id/actions`
 */
router.put('/:id/actions/:actionId', (req, res) => {
  const id = req.params.id;
  const actionId = req.params.actionId;
  actionDb.get(id).then(post => {
    if (!post) {
      return res.status(404).json({ message: 'ID not found' });
    }
    if (!req.body.description) {
      return res.status(400).json({ message: 'Description required' });
    }
    if (!req.body.notes) {
      return res.status(400).json({ message: 'Notes required' });
    }
    const updateAction = {
      project_id: actionId,
      description: req.body.description,
      notes: req.body.notes,
      completed: req.body.completed || false
    };

    actionDb
      .update(actionId, updateAction)
      .then(success => {
        res.status(201).json(success);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'Server error on Update' });
      });
  });
});

/***
 * POST
 * ENDPOINT: `/projects/:id/actions`
 */
router.post('/:id/actions', (req, res) => {
  const id = req.params.id;
  const actionId = req.params.actionId;
  actionDb.get(id).then(post => {
    if (!post) {
      return res.status(404).json({ message: 'ID not found' });
    }
    if (!req.body.description) {
      return res.status(400).json({ message: 'Description required' });
    }
    if (!req.body.notes) {
      return res.status(400).json({ message: 'Notes required' });
    }
    const postAction = {
      project_id: id,
      description: req.body.description,
      notes: req.body.notes,
      completed: req.body.completed || false
    };
    actionDb
      .insert(postAction)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ errorMessage: 'server error Creating Action Message' });
      });
  });
});

router.delete('/:id/actions/:actionId', (req, res) => {
  const id = req.params.id;
  const actionId = req.params.actionId;
  actionDb.get(actionId).then(post => {
    if (!post) {
      return res.status(404).json({ message: 'ID not found' });
    }
    actionDb
      .remove(actionId)
      .then(removed => {
        res.status(200).json(removed);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({
            errorMessage: 'Server Error Could not remove action message'
          });
      });
  });
});

module.exports = router;
