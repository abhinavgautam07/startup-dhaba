import {Schema, model} from "mongoose";

interface User {
    firstName: string,
    lastName: string,
    email: string,
    referralCode: string,
}

const userSchema = new Schema<User>({
    firstName: {type: "String", required: true},
    lastName: {type: "String", required: true},
    email: {type: "String", required: true},
    referralCode: {type: "String", required: true}
});

export const User = model<User>('User', userSchema);