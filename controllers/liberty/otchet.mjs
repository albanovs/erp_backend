import { LibertyOtchetBetaModel } from "../../models/data_otchet/otchet.mjs";
import { addSlot, getData, deleteData, updateDocument, createDefaultDocument as CreateOtchet } from "../components/otchet.mjs";

const createDefaultDocument = (req, res) => {
    CreateOtchet(req, res, LibertyOtchetBetaModel);
}
const addSlotOtchet = (req, res) => {
    addSlot(req, res, LibertyOtchetBetaModel, 'otchet');
};

const getOtchetBeta = (req, res) => {
    getData(req, res, LibertyOtchetBetaModel);
};

const deleteOtchetBeta = (req, res) => {
    deleteData(req, res, LibertyOtchetBetaModel);
};

const updateOtchetBeta = (req, res) => {
    const updates = req.body;
    updateDocument(req, res, LibertyOtchetBetaModel, "otchet", updates);
};

export default {
    createDefaultDocument,
    addSlotOtchet,
    getOtchetBeta,
    deleteOtchetBeta,
    updateOtchetBeta
};