const linkService = require('../service/link.service');
const { linkSchema } = require('../validation/link.validate');

const linkController = {
  // GET /api/links
  getLinks: async (req, res) => {
    try {
      const links = await linkService.getAllLinks();
      res.json(links);
    } catch (err) {
      res.status(500).json({ error: 'Server Error' });
    }
  },

  // POST /api/links
  createLink: async (req, res) => {
    try {
      const validatedData = linkSchema.parse(req.body); // ✅ Validate input
      const newLink = await linkService.addLink(validatedData);
      res.status(201).json(newLink);
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({
          error: 'Validation failed',
          details: err.errors,
        });
      }
      res.status(500).json({ error: 'Server Error' });
    }
  },

  // PUT /api/links/:id
  updateLink: async (req, res) => {
    try {
      const validatedData = linkSchema.partial().parse(req.body); // ✅ Allow partial fields
      const updatedLink = await linkService.updateLinkById(req.params.id, validatedData);
      res.json(updatedLink);
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({
          error: 'Validation failed',
          details: err.errors,
        });
      }
      res.status(400).json({ error: 'Update failed' });
    }
  },

  // DELETE /api/links/:id
  deleteLink: async (req, res) => {
    try {
      await linkService.deleteLinkById(req.params.id);
      res.json({ message: 'Link deleted' });
    } catch (err) {
      res.status(400).json({ error: 'Delete failed' });
    }
  },
};

module.exports = linkController;
