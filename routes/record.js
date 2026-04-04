const express=require('express');
const router=express.Router();
const {protect,authorize}=require('../middleware/auth');
const {
  createRecord,
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord
} = require('../controllers/record');

router.use(protect);


router.route('/').get(getRecords).post(authorize('admin'),createRecord);
router.route('/:id').get(getRecord).put(authorize('admin'),updateRecord).delete(authorize('admin'),deleteRecord);
module.exports=router;







