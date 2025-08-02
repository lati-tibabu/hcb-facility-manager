const { User, Site, UserSiteAssignment } = require("../../models");

const assignUserToSite = async (req, res) => {
    const {userId, siteId} = req.body;
    try{
        const user = await User.findByPk(userId);
        const site = await Site.findByPk(siteId);

        if(!user || !site){
            return res.status(404).json({error: "User or Site not found"});
        }

        const [assignment, created] = await UserSiteAssignment.findOrCreate({
            where: {userId, siteId}
        });

        if(!created){
            return res.status(409).json({message: "User already assigned to this site"});
        }

        return res.status(201).json({message: "User assigned to site successfully", assignment});
    }catch(error){
        console.error("Error assigning user to site:", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
};

const unassignUserFromSite = async (req, res) => {
    const {userId, siteId} = req.body;
    try{
        const assignment = await UserSiteAssignment.findOne({
            where: {userId, siteId}
        });
        if(!assignment){
            return res.status(404).json({error: "User not assigned to this site"});
        }
        await assignment.destroy();
        return res.status(200).json({message: "User unassigned from site successfully"});
    } catch (error) {
        console.error("Error unassigning user from site:", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
};

const getUsersForSite = async (req, res) => {
    const {siteId} = req.params;
    try {
        const site = await Site.findByPk(siteId, {
            include: [{
                model: User,
                as: 'users', 
                through: {
                    attributes: []
                }
            }]
        });
        if(!site){
            return res.status(404).json({error: "Site not found"});
        }

        return res.status(200).json(site.users || []);
    } catch (error) {
        return res.status(500).json({error: "Internal Server Error"});
    }
}

const getSitesForUser = async (req, res) => {
    const {userId} = req.params;

    try {
        const user = await User.findByPk(userId, {
            include: [{
                model: Site, 
                as: 'sites', 
                through: {
                    attributes: []
                }
            }]
        });
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json(user.sites || []);
    } catch (error) {
        return res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = {
    assignUserToSite,
    unassignUserFromSite,
    getUsersForSite,
    getSitesForUser
}