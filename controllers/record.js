const Record=require('../models/Record')
const asyncHandler=require('express-async-handler')
const ErrorResponse=require('../utils/errorResponse')

// @desc   Get all Records
// @route  Get /api/v1/records
// @access Public

const getRecords=asyncHandler(async(req,res,next)=>{
    const { type, category, startDate, endDate } = req.query;

  let query = {};

  if (type) query.type = type;
  if (category) query.category = category;

  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  } 
    
     const records = await Record.find(query).sort({date:-1});
     res.status(200).json(records);
})

// @desc   Get single record
// @route  Get /api/v1/records/:id
// @access Public

const getRecord=asyncHandler(async(req,res,next)=>{
    const record=await Record.findById(req.params.id)

     if(!record)
    {
       return next(new ErrorResponse(`Record not found with the id of ${req.params.id}`,404));
    }

    res.status(200).json({
        success:true,
        data:record,
    });
 })

 // @desc   Create Record
// @route  POST /api/v1/records
// @access Private/admin

const createRecord=asyncHandler(async(req,res,next)=>{

    const record=await Record.create({...req.body,user:req.user._id})

    res.status(201).json({
        success:true,
        data:record,
    });
 })


// @desc   Update Record
// @route  PUT /api/v1/records/:id
// @access Private/admin

const updateRecord=asyncHandler(async(req,res,next)=>{

    const record=await Record.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,

    })

    res.status(200).json({
        success:true,
        data:record,
    });
 })


// @desc   Delete Record
// @route  Delete /api/v1/records/:id
// @access Private/admin

const deleteRecord=asyncHandler(async(req,res,next)=>{

    await Record.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        data:{}
    });
 })

 module.exports={
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord
 }





