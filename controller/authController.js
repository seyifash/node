const User = require('../models/users')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')



const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if(!email || !pwd) {
        return res.status(400).json({"message" : 'Email and password are required'})
    }
     const foundUser = await User.findOne({ email }).exec();
     if(!foundUser){
        return res.sendStatus(401); //unAuthorised
     }
     const match = await bcrypt.compare(pwd, foundUser.password);
     if(match) {
        //create JWT

        const accessToken = jwt.sign(
         { "email": foundUser.email},
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn: '30s'}
        );

        const refreshToken = jwt.sign(
         { "email": foundUser.email},
         process.env.REFRESH_TOKEN_SECRET,
         {expiresIn: '1d'}
        );

        // saving the refreshToken in the database

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000}); // secure should be set to true in production
        res.json({ accessToken})
     } else {
        res.sendStatus(401);
     }
}

module.exports = { handleLogin}
