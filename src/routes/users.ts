import express = require("express");
import {registerUser,getReferralCode,getReferralCountPerUser} from "../controllers/users";
const router = express.Router();

router.post('/register',registerUser);
router.post('/get-referral',getReferralCode);
router.get("/get-referrals-per-user",getReferralCountPerUser);
export default router;