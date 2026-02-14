const User = require("../models/users");
const jwt = require("jsonwebtoken");


const generateToken = (userId, role) => {
    const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET , { expiresIn: '1d' });
    return token;
};

const register = async (fullName, email, password, age, avatar) => {
    try {
        const userRegister = await User.findOne({ email });
        if (userRegister) {
            throw new Error("This user already exists");
        }

        const newUser = new User({
            fullName,
            email,
            password, 
            age,
            avatar,
            role:'user'
        });

        await newUser.save();
        return newUser;
    } 
    catch (err) {
        throw err;
    }
};

const login = async (email, password) => {
    const user = await findUser(email);
    if (!user) return null; 


    const isMatch = await user.comparePassword(password);
    if (!isMatch) return null; 

    const token = generateToken(user._id, user.role);
    return {
        user,
        accessToken: token
    };
};


const findUser = async (email) => {
    return await User.findOne({ email });
};

const findUserById = async (id) => {
    return await User.findById(id);
};

const findCurrentUser = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const userCurrent = await User.findOne({ _id: userId }).select("-password");
    if (!userCurrent) {
        throw new Error("User not found");
    }
    return userCurrent;
};

const deleteUserById = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

const createUser = async ({ fullName, email, password, age, avatar, role }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const newUser = new User({
        fullName,
        email,
        password,
        age,
        avatar,
        role 
    });

    await newUser.save();
    return newUser;
};



module.exports = {
    register,
    findUser,
    login,
    findCurrentUser,
    findUserById,
    deleteUserById,
    createUser
};
