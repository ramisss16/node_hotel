const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req , res, next) => {

    // first check req headers has authorization ot not 
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: 'Token not fount'});

    // extract the jwt token from the req. header
    const token =  req.headers.authorization.split(' ')[1];  // split isliye qki tkon me bears and apze then token rehti hai isliye 
                                                             // space se phle wale ko 0 me and uske bad wale ko 1 me dale
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try{
        // verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user information to the req. object
        req.user = decoded  // we can cahnge req.user ke user ko kuch bhi rkh skte hai
        next();
    }  catch(err){
        console.log(err);
        res.status(401).json({error: 'Invalid token'});
    }
}

// function to generate token
const generateToken = (userData) => {
    // generate a new JWT token using user data 
    // return jwt.sign(userData , process.env.JWT_SECRET )
    return jwt.sign(userData , process.env.JWT_SECRET  , {expiresIn: 30000})    // -> expresin expirty date ye second me hoti hao 
}


module.exports = {jwtAuthMiddleware , generateToken}