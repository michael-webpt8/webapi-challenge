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
router.put('/:id/actions', (req, res) => {
  const id = req.params.id;
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
      project_
    };
  });
});

module.exports = router;
