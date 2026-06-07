import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// register
export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: "Email already registered"})
    }
    const numberSaved = await User.findOne({phone})
    if(numberSaved){
      return res.status(400).json({message: "Phone Number already exists"})
    }
    if(password.length < 6){
        return res.status(400).json({message: "Password should be of atleast 6 chracter"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({name, email, phone, password: hashedPassword, role})
    await newUser.save()
    res.status(200).json({message: "Signup success", id: newUser._id})
  } catch (error) {
    return res.status(500).json({message: "signup failed"})
  }
};

export const login = async(req,res) =>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Email does not exists"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json("Password is wrong")
        }
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {expiresIn: "1d"}
        );
        return res.status(200).json({
          message: "Login Success",
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Login failed", error})
    }
    
}
