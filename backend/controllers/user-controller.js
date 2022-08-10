import User from "../model/User";
import bcrypt from 'bcryptjs';

/******* Controller To get all the users from the database ******/
export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }
    catch (err) {
        console.log(err);
    }

    if (!users) {
        return res.status(404).json({ message: "Users not found" });
    }

    return res.status(200).json({ users }); //200 : success
}

/*********Controller for sign up Functionality *******/
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body; //we get the name, email, password from request body

    /*VALIDATION OF THE USER*/ 
    
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    }
    catch (err) {
        return console.log(err);
    }

    if (existingUser) {
        return res.status(400).json({message: "User already exists. Please login" });
    } 

    /* IF USER NOT FOUND WE CAN CREATE NEW USER */
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedPassword, 
        blogs:[]
    });

    

    try {
        await user.save();
    }
    catch (err) {
        return console.log(err);
    }

    return res.status(201).json({ user }); //201: created
    
}

/***Controller for login functionality  ***/

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    }
    catch (err) {
        return console.log(err);
    }

    if (!existingUser) {
        return res.status(404).json({ message: "User with this email does not exist" });
    }
    
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
    }

    return res.status(200).json({ message: "Successfully Logged In", user: existingUser });
}

