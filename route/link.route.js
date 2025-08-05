const express = require('express');
const router = express.Router();
const linkController = require('../controller/link.controller');

// GET all links
router.get('/getall', linkController.getLinks);

// POST a new link
router.post('/create', linkController.createLink);
// PUT update a link
router.put('/:id', linkController.updateLink);

// DELETE a link
router.delete('/:id', linkController.deleteLink);

module.exports = router;
