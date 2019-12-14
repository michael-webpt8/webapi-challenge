const express = require('express');
const actionDb = require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router({
  mergeParams: true
});

router.get('/:id/actions', (req, res) => {
  const id = req.params.id;
  actionDb.get(id).then(data => {
    if (!data) {
      return res.status(404).json({ message: 'Could not find ID for Action' });
    }
    actionDb
      .get(data)
      .then(post => {
        console.log('post', post);
        console.log('data', data);
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'Error getting Action Message' });
      });
  });
});

module.exports = router;
