import mongoose from "mongoose";
import { SimcardSchema } from '../components/Simcard.mjs'

const DataSchema = new mongoose.Schema({
    SimcardSchema
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
