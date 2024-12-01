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
            logist: {
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

const SimcardLeaderAdmins = mongoose.model('simcardleaderadmins', DataSchema);
const SimcardMonacoAdmins = mongoose.model('simcardmonacoadmins', DataSchema);
const SimcardLibertyAdmins = mongoose.model('simcardlibertyadmins', DataSchema);
const SimcardTuranAdmins = mongoose.model('simcardturanadmins', DataSchema);
const SimcardIlyasAdmins = mongoose.model('simcardilyasadmins', DataSchema);

export {
    SimcardLeaderAdmins,
    SimcardMonacoAdmins,
    SimcardLibertyAdmins,
    SimcardTuranAdmins,
    SimcardIlyasAdmins,
};
