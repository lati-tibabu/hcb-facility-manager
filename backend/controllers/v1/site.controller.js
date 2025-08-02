const { Site } = require('../../models');

const createSite = async (req, res) => {
    try{
        if (Array.isArray(req.body)){
            const sites = await Site.bulkCreate(req.body, {
                individualHooks: true
            });
            return res.status(201).json(sites);
        }
        const site = await Site.create(req.body);
        res.status(201).json(site);
    }catch(error){
        console.error('Error creating site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getSites = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    try {
        const { count, rows: sites } = await Site.findAndCountAll({
            offset,
            limit,
            order: [["createdAt", "DESC"]]
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            data: sites,
            meta: {
                totalItems: count,
                currentPage: page,
                totalPages,
                pageSize: limit,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        });
    } catch (error) {
        console.error('Error fetching sites:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSiteById = async (req, res) => {
    try {
        const site = await Site.findByPk(req.params.id);
        if (!site) {
            return res.status(404).json({ error: "Site not found" });
        }
        res.status(200).json(site);
    } catch (error) {
        console.error('Error fetching site by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateSite = async (req, res) => {
    try {
        const site = await Site.findByPk(req.params.id);

        if (!site) {
            return res.status(404).json({ error: "Site not found" });
        }
        await site.update(req.body);
        res.status(200).json({ message: "Site updated successfully" });
    } catch (error) {
        console.error('Error updating site:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteSite = async (req, res) => {
    try {
        const site = await Site.findByPk(req.params.id);
        if (!site) {
            return res.status(404).json({ error: "Site not found" });
        }
        await site.destroy();
        res.status(200).json({ message: "Site deleted successfully" });
    } catch (error) {
        console.error('Error deleting site:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    createSite,
    getSites,
    getSiteById,
    updateSite,
    deleteSite
}