import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export const authUser = asyncHandler(async(req,res)=>{

    const {email,password} = req.body;

    const user =  await User.findOne({email})


    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
    
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(401);
        throw new Error('Invalid email or password');
      }
  

})   
export const registerUser = asyncHandler(async(req,res)=>{
    // console.log(req.body);

    const { email,password,name } = req.body;

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User Already Exists');
    }

    const user  = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id);
    
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }



    res.status(200).json({message :'Register User'})

})   
export const getUserProfile = asyncHandler(async(req,res)=>{

    const user  =  await  User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
    }
    else{
        res.status(404)
        throw new Error('User Not Found')

    }

    // res.status(200).json({message :' User Profile'})

})   
export const updateUserProfile = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }

})   
export const logOutUser = asyncHandler(async(req,res)=>{

    res.cookie('jwt','',{
        httpOnly:true,
        expires : new Date(0)

    })
    res.status(200).json({message :'Logout User '})

})   