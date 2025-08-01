const { User } = require('../../models');

const createUser = async (req, res) => {
    try{
        if (Array.isArray(req.body)){
            const users = await User.bulkCreate(req.body, {
                individualHooks: true
            });
            return res.status(201).json(users);
        }

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            role: req.body.role,
            password: req.body.password
        });

        res.status(201).json(user);

    }catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUsers  = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page-1) * 10;

    try{
        const { count, rows:users } = await User.findAndCountAll({
            offset,
            limit,
            order: [["createdAt", "DESC"]]
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            data: users,
            meta: {
                totalItems: count,
                currentPage: page,
                totalPages,
                pageSize: limit,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        });
    }catch(error){
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);

        if (!user){
            res.status(404).json({error:"User not found"});
        }
        await user.update(req.body);
        res.status(201).json({message: "User updated succesfully"});
    } catch(error){
        res.status(500).json({error: "Internal Server Error"});
    }
};

const deleteUser = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            res.status(404).json({error: "User not found"});
        }
        await user.destroy();
        res.status(201).json({message: "User deleted succesfully"});
    }catch(error){
        res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}