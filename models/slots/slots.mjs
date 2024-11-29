import mongoose from 'mongoose';

const myModelSchema = new mongoose.Schema({
    account: { type: String, required: true },
    num: { type: Number, default: 1 },
    monako: { type: String, default: "" },
    ilyas: { type: String, default: "" },
    leader: { type: String, default: "" },
    turan: { type: String, default: "" },
    liberty: { type: String, default: "" },
});

const InstagramSlot = mongoose.model('InstagramSlot', myModelSchema);
const TelegramSlot = mongoose.model('TelegramSlot', myModelSchema);

export {
    InstagramSlot,
    TelegramSlot,
};