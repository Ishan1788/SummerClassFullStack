// let users = []; //In-memory user storage (temporary)

import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function register(req, res) {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Email, username, and password are required.' });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: 'Email already registered' });
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Server error', error: e.message });
  }
}
export async function login(req, res){
  try{
    const { username, password} = req.body;

    const user = await User.findOne({username});
    if (!user)return res.status(401).json({ message: 'Invalid credentials'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(401).send("Invalid credentials");
    
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn: "1h"});

    res.json({ message: 'Login successful', user, token});
  } catch(e){
    return res.status(500).send(e);
  }
}

export async function allUsers(req, res) {
  try {
    // Find all users, exclude password field
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}