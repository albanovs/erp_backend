import { MonacoOtchetBetaModel } from "../../models/data_otchet/otchet.mjs";
import { addSlot, getData, deleteData, updateDocument, createDefaultDocument as CreateOtchet } from "../components/otchet.mjs";

const createDefaultDocument = (req, res) => {
    CreateOtchet(req, res, MonacoOtchetBetaModel);
}
const addSlotOtchet = (req, res) => {
    addSlot(req, res, MonacoOtchetBetaModel, 'otchet');
};

const getOtchetBeta = (req, res) => {
    getData(req, res, MonacoOtchetBetaModel);
};

const deleteOtchetBeta = (req, res) => {
    deleteData(req, res, MonacoOtchetBetaModel);
};

const updateOtchetBeta = (req, res) => {
    const updates = req.body;
    updateDocument(req, res, MonacoOtchetBetaModel, "otchet", updates);
};

const updateItogBeta = (req, res) => {
    const updates = req.body;
    updateDocument(req, res, MonacoOtchetBetaModel, "itog", updates);
};

export default {
    createDefaultDocument,
    addSlotOtchet,
    getOtchetBeta,
    deleteOtchetBeta,
    updateOtchetBeta,
    updateItogBeta
};