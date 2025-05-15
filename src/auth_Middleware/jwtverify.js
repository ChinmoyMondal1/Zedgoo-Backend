const jwt = require('jsonwebtoken')
require('dotenv').config();

const authenticate = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.Secret_token); //verifies the secret key from token and the one in env file
        req.user = decoded;
        console.warn(decoded);
        
        console.log('Secret used to sign:', process.env.Secret_token); 
        console.log('Authentication successful. Token:', token);
        next();
        
    }
    catch(error){
        console.log('Authentication failed. Token:', error.message);
        return res.status(401).json({ message:error.message });
    }
    
}

module.exports =authenticate;