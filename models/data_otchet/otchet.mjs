import mongoose from "mongoose";
import { ItogSchema, OtchetSchema } from "../components/DataModel.mjs";

const DataSchema = new mongoose.Schema({
    otchet: [OtchetSchema],
    itog: [ItogSchema],
});

const LeaderOtchetBetaModel = mongoose.model('leaderitogbeta', DataSchema);
const MonacoOtchetBetaModel = mongoose.model('monacoitogbeta', DataSchema);
const TuranOtchetBetaModel = mongoose.model('turanitogbeta', DataSchema);
const LibertyOtchetBetaModel = mongoose.model('libertyitogbeta', DataSchema);
const IlyasOtchetBetaModel = mongoose.model('ilyasitogbeta', DataSchema);

export {
    LeaderOtchetBetaModel,
    MonacoOtchetBetaModel,
    TuranOtchetBetaModel,
    LibertyOtchetBetaModel,
    IlyasOtchetBetaModel
};