import { LeaderOtchetBetaModel } from "../../models/data_otchet/otchet.mjs";
import { addSlot, getData, deleteData, updateDocument, createDefaultDocument as CreateOtchet } from "../components/otchet.mjs";

const createDefaultDocument = (req, res) => {
    CreateOtchet(req, res, LeaderOtchetBetaModel);
}
const addSlotOtchet = (req, res) => {
    addSlot(req, res, LeaderOtchetBetaModel, 'otchet');
};

const getOtchetBeta = (req, res) => {
    getData(req, res, LeaderOtchetBetaModel);
};

const deleteOtchetBeta = (req, res) => {
    deleteData(req, res, LeaderOtchetBetaModel);
};

const updateOtchetBeta = (req, res) => {
    const updates = req.body;
    updateDocument(req, res, LeaderOtchetBetaModel, "otchet", updates);
};

export default {
    createDefaultDocument,
    addSlotOtchet,
    getOtchetBeta,
    deleteOtchetBeta,
    updateOtchetBeta
};