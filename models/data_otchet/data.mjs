import mongoose from "mongoose";
import { ItogSchema, OtchetSchema } from "../components/DataModel.mjs";

const DataSchema = new mongoose.Schema({
    date: String,
    otchet: [OtchetSchema],
    itog: [ItogSchema],
});

const LeaderDataModel = mongoose.model('leaderdata', DataSchema);
const MonacoDataModel = mongoose.model('monacodata', DataSchema);
const TuranDataModel = mongoose.model('turandata', DataSchema);
const IlyasDataModel = mongoose.model('ilyasdata', DataSchema);
const LibertyDataModel = mongoose.model('libertydata', DataSchema);

export {
    LeaderDataModel,
    MonacoDataModel,
    TuranDataModel,
    IlyasDataModel,
    LibertyDataModel
};