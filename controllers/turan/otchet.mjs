import { TuranOtchetBetaModel } from "../../models/data_otchet/otchet.mjs";
import { addSlot, getData, deleteData, updateDocument, createDefaultDocument as CreateOtchet } from "../components/otchet.mjs";

const createDefaultDocument = (req, res) => {
    CreateOtchet(req, res, TuranOtchetBetaModel);
}
const addSlotOtchet = (req, res) => {
    addSlot(req, res, TuranOtchetBetaModel, 'otchet');
};

const getOtchetBeta = (req, res) => {
    getData(req, res, TuranOtchetBetaModel);
};

const deleteOtchetBeta = (req, res) => {
    deleteData(req, res, TuranOtchetBetaModel);
};

const updateOtchetBeta = (req, res) => {
    const updates = req.body;
    updateDocument(req, res, TuranOtchetBetaModel, "otchet", updates);
};

const updateItogBeta = (req, res) => {
    const updates = req.body;
    updateDocument(req, res, TuranOtchetBetaModel, "itog", updates);
};

export default {
    createDefaultDocument,
    addSlotOtchet,
    getOtchetBeta,
    deleteOtchetBeta,
    updateOtchetBeta,
    updateItogBeta
};