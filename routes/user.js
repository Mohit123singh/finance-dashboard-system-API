const express=require('express');
const router=express.Router();
const {protect,authorize}=require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));


const {getUsers,getUser,createUser,updateUser,deleteUser}=require('../controllers/user');

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
module.exports=router;