const asyncHandler=require('express-async-handler')
const User=require('../models/User')
const ErrorResponse=require('../utils/errorResponse')



// @desc   Get all users
// @route  Get /api/v1/users
// @access Private/admin

const getUsers=asyncHandler(async(req,res,next)=>{
     const users = await User.find();
     res.status(200).json(users);
})


// @desc   Get single user
// @route  Get /api/v1/users/:id
// @access Private/admin

const getUser=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.params.id)

     if(!user)
    {
       return next(new ErrorResponse(`User not found with the id of ${req.params.id}`,404));
    }

    res.status(200).json({
        success:true,
        data:user,
    });
 })



// @desc   Create User
// @route  POST /api/v1/users
// @access Private/admin

const createUser=asyncHandler(async(req,res,next)=>{

    const user=await User.create(req.body)

    res.status(201).json({
        success:true,
        data:user,
    });
 })



// @desc   Update User
// @route  PUT /api/v1/users/:id
// @access Private/admin

const updateUser=asyncHandler(async(req,res,next)=>{

    const user=await User.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,

    })

    res.status(200).json({
        success:true,
        data:user,
    });
 })


// @desc   Delete User
// @route  Delete /api/v1/users/:id
// @access Private/admin

const deleteUser=asyncHandler(async(req,res,next)=>{

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        data:{}
    });
 })

 module.exports={
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
 }