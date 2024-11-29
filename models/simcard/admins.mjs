import mongoose from "mongoose";
import { SimcardSchema } from '../components/Simcard.mjs'

const DataSchema = new mongoose.Schema({
    SimcardSchema
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
