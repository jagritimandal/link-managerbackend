const express = require('express');
const router = express.Router();
const linkController = require('../controller/link.controller');

// GET all links
router.get('/', linkController.getLinks);

// POST a new link
router.post('/', linkController.createLink);
// PUT update a link
router.put('/:id', linkController.updateLink);

// DELETE a link
router.delete('/:id', linkControllerdeleteLink);

module.exports = router;
