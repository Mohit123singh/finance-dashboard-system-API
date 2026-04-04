const Record=require('../models/Record')
const asyncHandler=require('express-async-handler')

// @desc   Get single record
// @route  Get /api/v1/dashboard
// @access Private

const getSummary=asyncHandler(async(req,res,next)=>{
  
    const income = await Record.aggregate([
    { $match: { type: 'income' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);

  const expense = await Record.aggregate([
    { $match: { type: 'expense' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);

  const categoryTotals = await Record.aggregate([
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' }
      }
    }
  ]);

  const recent = await Record.find().sort({ createdAt: -1 }).limit(5);

  res.status(200).json({
    totalIncome: income[0]?.total || 0,
    totalExpense: expense[0]?.total || 0,
    netBalance:
      (income[0]?.total || 0) - (expense[0]?.total || 0),
    categoryTotals,
    recent
  });
 })

 module.exports=getSummary