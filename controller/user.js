import { User } from "../model/index.js";

// getUserProfile
const getUserProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json('user not found');
        }

        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

// updateUserProfile
const updateUserProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json('user not found');
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUser = await user.save();

        return res.status(200).json({
            id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        });
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

// getUsers
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

// getUserById
const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json('user not found');
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

// updateUser
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json('user not found');
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updateUser = await user.save();

        return res.status(200).json({
            id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        });
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

// deleteUserById
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json('user not found');
        } else {
            if(user.isAdmin) {
                return res.status(400).json(`can't delete admin user`);
            }
            const deleteUser = await User.deleteOne(user._id);
            res.status(200).json({user: deleteUser, message: 'user deleted successful'});
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

export { getUserProfile, 
    updateUserProfile, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUserById 
}