const authService = require('../services/authService');
const generateToken = require('../utils/generateToken');
const { comparePassword } = require('../utils/password');

const login = async (req, res, next) => {
    try {
        const{email, password} = req.body;
        //validate input
        if(!email || !password){
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        //find admin by email
        const admin = await authService.findAdminByEmail(email);
        if(!admin){
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        } 

        // compare password
        const isMatch = await comparePassword(password, admin.password);
        if(!isMatch){
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        //generate token
        const token = generateToken(admin);

        // respond with token
        return res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        next(error);
    }
}
module.exports = { login };