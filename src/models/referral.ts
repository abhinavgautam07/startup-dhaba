import {Schema, model, Types} from "mongoose"

interface Referral {
    referrer: Types.ObjectId,
    referee: Types.ObjectId
}

const referralSchema = new Schema<Referral>({
    referrer: {type: Schema.Types.ObjectId, ref: 'User'},
    referee: {type: Schema.Types.ObjectId, ref: 'User'}
});

export const Referral = model<Referral>('Referral', referralSchema);

