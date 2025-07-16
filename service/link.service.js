const Link = require('../model/link.model');

const linkService ={

    // Get all links (sorted by date)
    getAllLinks : async () => {
    return await Link.find().sort({ date: -1 });
    },

    // Add a new link
    addLink : async (linkData) => {
    const { title, url, category, notes } = linkData;
    const newLink = new Link({ title, url, category, notes });
    return await newLink.save();
    },

    // Update a link by ID
    updateLinkById : async (id, linkData) => {
    return await Link.findByIdAndUpdate(id, linkData, { new: true });
    },
    

    // Delete a link by ID
    deleteLinkById : async (id) => {
    return await Link.findByIdAndDelete(id);
    },
}

module.exports = linkService;
