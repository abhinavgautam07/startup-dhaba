import {Request, Response} from "express";
import {User} from "../../models"
import {Referral} from "../../models";

export const getReferralCode = async (req: Request, res: Response) => {
    let user = await User.findOne({email: req.body.email}).lean();

    return user ? res.status(200).json({
        referral: user.referralCode
    }) : res.status(200).json({
        message: "No such user found"
    })

}

export const getUserIdByReferralCode = async (referralCode: string) => {
    let user = await User.findOne({referralCode}).lean();
    return user?._id;
}
const checkIfUserExists = async (email: string) => {
    let users = await User.find({email}).lean();
    return users.length > 0;
}
const generateReferralCode = (fname: string, lname: string) => {
    return fname.charAt(0) + lname.charAt(0) + Date.now();
}
export const registerUser = async (req: Request, res: Response) => {
    const {fname, lname, email, referralCode} = req.body;
    console.log(fname, lname, email);
    if ((await checkIfUserExists(req.body.email))) {
        return res.status(201).json({
            message: "user already exist"
        });
    }
    const user = new User({
        firstName: fname,
        lastName: lname,
        email: email,
        referralCode: generateReferralCode(fname, lname)
    });
    let newUser = await user.save()
    if (referralCode) {
        let referrer = await getUserIdByReferralCode(referralCode);
        if (referrer) {
            const referral = new Referral({
                referee: newUser._id,
                referrer: referrer
            });
            await referral.save();
        }
    }
    return res.status(201).json({
        message: "user created successfully"
    })

}

export const getReferralCountPerUser = async (req: Request, res: Response) => {
    try {
        let user = await User.aggregate([
            {
                $lookup: {from: 'referrals', localField: '_id', foreignField: 'referrer', as: 'referredTo'}
            },
            {
                $project: {
                    _id:0,
                    firstName: "$firstName",
                    lastName: "$lastName",
                    email: "$email",
                    referredTo: {$size: "$referredTo"}
                }
            }
        ]);

        return res.status(200).json({
            user
        })
    } catch (e) {
        console.log(e);
    }
};