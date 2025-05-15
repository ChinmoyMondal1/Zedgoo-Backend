const LoginOp = require('../models/login.js')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const logincontrol = async(req,res)=>{
    const {email,pass} = req.body;
    // console.log(req.body);
    
    
    if ( !email || !pass || pass.trim() === "") {
        console.log("All fields required");
        
        return res.status(400).json({ success: false, message: "All fields must be filled" });    //just for validation (Can be done in FE)
    }

    try {
        const login = await LoginOp( email, pass); // Fixed argument order (email before pass)
        console.log("result: ",login);
        
       
        if (login.success) {
            const user = login.user;
            const token = jwt.sign(
                {   
                    email: user.email,
                    orgID : user.orgID
                },
                process.env.Secret_token,
                { expiresIn:process.env.expiresIn},
                
            )
            
            console.log(token)
            return res.status(201).json({ success: true, message: login.message, token });
        } else {
            return res.status(500).json({ success: false,message:login.message});
        }
    } catch (error) {
        console.error(" Server error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports= logincontrol;