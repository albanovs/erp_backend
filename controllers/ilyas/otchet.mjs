import { IlyasOtchetBetaModel } from "../../models/data_otchet/otchet.mjs";
import { addSlot, getData, deleteData, updateDocument, createDefaultDocument as CreateOtchet } from "../components/otchet.mjs";

const createDefaultDocument = (req, res) => {
    CreateOtchet(req, res, IlyasOtchetBetaModel);
}

const addSlotOtchet = (req, res) => {
    addSlot(req, res, IlyasOtchetBetaModel, 'otchet');
};

const getOtchetBeta = (req, res) => {
    getData(req, res, IlyasOtchetBetaModel);
};

const deleteOtchetBeta = (req, res) => {
    deleteData(req, res, IlyasOtchetBetaModel);
};

const updateOtchetBeta = (req, res) => {
    const updates = req.body;
    updateDocument(req, res, IlyasOtchetBetaModel, "otchet", updates);
};

const updateItogBeta = (req, res) => {
    const updates = req.body;
    updateDocument(req, res, IlyasOtchetBetaModel, "itog", updates);
};

export default {
    createDefaultDocument,
    addSlotOtchet,
    getOtchetBeta,
    deleteOtchetBeta,
    updateOtchetBeta,
    updateItogBeta
};