const userService = require("../services/users.service");
const adminAuth = require("../middleware/adminAuth");

const register = async (req, res) => {
    try {
        const { fullName, email, password, age, avatar } = req.body;
        const user = await userService.register(fullName, email, password, age, avatar);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Could not register", error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login(email, password);

        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};

const getCurrentUser = async (req, res) => {
    const token = req.header('x-auth-header');
    try {
        const currentUser = await userService.findCurrentUser(token);
        res.status(200).json(currentUser);
    } catch (err) {
        res.status(500).json({ message: "Could not fetch current user", error: err.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.deleteUserById(id);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = {
    register,
    login,
    getCurrentUser,
    deleteUser,
    createUser
};
