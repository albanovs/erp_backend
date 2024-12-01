import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    data_register: {
        type: String,
        default: "",
    },
    curator: {
        type: String,
        default: "",
    },
    slot: [
        {
            num: {
                type: Number,
                
                default: 0,
            },
            number: {
                type: String,
                default: "",
            },
            status: {
                type: String,
                default: "",
            },
            buyer: {
                type: String,
                default: "",
            },
            personal_number: {
                type: String,
                default: "",
            },
            date_of_verification: {
                type: String,
                default: "",
            },
            days_since_verification: {
                type: String,
                default: "",
            },
            status_simCard: {
                type: String,
                default: "",
            },
            physical_simCard: {
                type: String,
                default: "",
            },
            registration: {
                type: String,
                default: "",
            },
            WAcod: {
                type: String,
                default: "",
            },
            TGcod: {
                type: String,
                default: "",
            },
            data_register: {
                type: String,
                default: "",
            },
        },
    ],
});

const SimcardLeaderManager = mongoose.model('simcardleadermanager', DataSchema);
const SimcardMonacoManager = mongoose.model('simcardmonacomanager', DataSchema);
const SimcardLibertyManager = mongoose.model('simcardlibertymanager', DataSchema);
const SimcardTuranManager = mongoose.model('simcardturanmanager', DataSchema);
const SimcardIlyasManager = mongoose.model('simcardilyasmanager', DataSchema);

export {
    SimcardLeaderManager,
    SimcardMonacoManager,
    SimcardLibertyManager,
    SimcardTuranManager,
    SimcardIlyasManager
};