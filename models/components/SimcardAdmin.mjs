import mongoose from "mongoose";

const SimcardSchema = new mongoose.Schema({
    data_register: String,
    curator: String,
    slot: [{
        num: Number,
        number: String,
        status: String,
        logist: String,
        personal_number: String,
        date_of_verification: String,
        days_since_verification: String,
        status_simCard: String,
        physical_simCard: String,
        registration: String,
        WAcod: String,
        TGcod: String,
        data_register: String,
    }]
}, { strict: false });


export { SimcardSchema };
