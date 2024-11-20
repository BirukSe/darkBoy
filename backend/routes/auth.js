import express from "express";
import { register, login, lister, updateUser, deleteUser, followUser, unfollowUser, checkAdmin, checkPeople} from "../controllers/auther.js";
import {adminStatus} from '../middleware/adminStatus.js'
const router=express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/people', checkPeople);
router.get('/:id', lister);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.put("/:id/follow", followUser);

router.put("/:id/unfollow", unfollowUser);


router.post("/check", adminStatus,checkAdmin);

export default router;
//follower :   6733cb915e89b82bcdf0d1e8
//the tefollower :  6733cc365e89b82bcdf0d1eb