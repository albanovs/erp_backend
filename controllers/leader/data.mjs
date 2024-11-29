import { LeaderDataModel } from '../../models/data_otchet/data.mjs'
import OtchetController from './otchet.mjs'
import { createUniversalData } from '../components/data.mjs'

const createData = async (req, res) => {
    try {
        await createUniversalData(req, res, LeaderDataModel, OtchetController, "Лидер");
    } catch (error) {
        res.status(500).json({ message: "Ошибка при создании данных для другой модели" });
    }
};
const getData = async (req, res) => {
    try {

        const data = await LeaderDataModel.find();
        res.status(200).json(data);
    } catch (error) {
        console.error("Ошибка в getLiderData:", error);
        res.status(500).json({
            error: "Что-то пошло не так",
        });
    }
};

export default {
    createData,
    getData
}