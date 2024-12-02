// create function to register a new user
const User = require('../model/User');
const jwt = require('jsonwebtoken');

// handle errors
const hanndleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = {email:'',password:''};

    // incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'That email is not registered';
    }
    // incorrect password
    if(err.message === 'incorrect email'){
        errors.password = 'That password is incorrect';
    } 

    if (err.code === 11000) {
        errors.email = 'Email already in used. Please try again';
        return errors;
    }
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
            
        });
    // console.log(Object.values(error.errors));

        }
    return errors;
}

// 
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id)=>{
    return jwt.sign({id},'secret enock',{
        expiresIn: maxAge 
    });

}
// register a new user
module.exports.signup_post = async (req,res)=>{
    const {names,phone,email,password} = req.body;

    try {
        const user = await User.create({names,phone,email,password});
        //const token  = createToken(user._id);
        //res.cookie('jwt',token,{httpOnly:true,maxAge: maxAge * 1000});
        // res.status(201).json(user);
        res.status(201).json({user: user._id});
       
    } catch (err) {
        const errors = hanndleErrors(err);
        res.status(400).json({errors});
    }
};

// select all users
module.exports.all_users = async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
    }
};

// select a single user
module.exports.single_user = async (req,res)=>{
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
    }
};

// update a user
module.exports.update_user = async (req,res)=>{
    const id = req.params.id;
    const {names,phone,email,password} = req.body;
    try {
        const user = await User.findByIdAndUpdate(id,{names,phone,email,password});
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
    }
};

// delete a user
module.exports.delete_user = async (req,res)=>{
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
    }
};
