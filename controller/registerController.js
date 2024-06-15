const User = require('../models/users');

const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    const { firstName, lastName, email, pwd } = req.body;
    if(!firstName || !lastName || !email || !pwd){
        return res.status(400).json({'message': 'username , email and password are required'})
    }

    //check for duplicate userName in the database
    const duplicate = await User.findOne({ email: email }).exec();
    if(duplicate) {
        return res.status(409).json({'message': 'Email already taken'})
    }
    try{
        // encrypt user password
        const hashPwd = await bcrypt.hash(pwd, 10);
        // create and store user object
        const result = await User.create({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": hashPwd
        });
        console.log(result);

        res.status(201).json({'success': `New user ${firstName} created!`})
    } catch(err) {
        res.status(500).json({'message': err.message});
    }

   
}

module.exports =  { createUser }