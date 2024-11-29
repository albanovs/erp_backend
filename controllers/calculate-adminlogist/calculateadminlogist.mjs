import { isCurrentMonthAndYear, isWithinLast45Days } from "../calculate-logist/utils/utils.mjs";
import cron from 'node-cron';
import AdminLogistRaiting from "../../models/adminlogistraiting/adminlogistraiting.mjs";
import { calculateMatchesLogist, calculateSumComPersent100 } from "./utils/utils.mjs";
import { LeaderDataModel, MonacoDataModel, TuranDataModel, LibertyDataModel } from '../../models/data_otchet/data.mjs'
import LogistAndAdmin from "../../models/simcard/logist_admin.mjs";

let cachedData = null;

async function calculateAndCacheData() {
    try {
        const [adminAndLogist, leader, monaco, turan, liberty] = await Promise.all([
            LogistAndAdmin.find(),
            LeaderDataModel.find(),
            MonacoDataModel.find(),
            TuranDataModel.find(),
            LibertyDataModel.find(),
        ]);

        const allRatings = {
            logist: [],
            admin: [],
        };

        adminAndLogist.forEach(item => {
            let filteredItems = [];
            switch (item.team) {
                case 'leader':
                    filteredItems = leader.filter(leaderItem => isCurrentMonthAndYear(leaderItem.date));
                    break;
                case 'monaco':
                    filteredItems = monaco.filter(monacoItem => isCurrentMonthAndYear(monacoItem.date));
                    break;
                case 'turan':
                    filteredItems = turan.filter(turanItem => isCurrentMonthAndYear(turanItem.date));
                    break;
                case 'liberty':
                    filteredItems = liberty.filter(libertyItem => isCurrentMonthAndYear(libertyItem.date));
                    break;
                default:
                    filteredItems = [];
            }

            const nonEmptyLogist = item.slot.filter(slotItem => slotItem.logist !== '' && slotItem.status === '2');

            nonEmptyLogist.forEach(elem => {
                const matchesLogist = calculateMatchesLogist(filteredItems, elem);
                const sumComPersent100 = calculateSumComPersent100(filteredItems, elem);

                const coeff = (sumComPersent100 === 0 || matchesLogist === 0) ? 0 : ((parseFloat(sumComPersent100) * parseFloat(matchesLogist)) / 10000).toFixed(4);

                const dataRating = {
                    team: item.team,
                    select: item.select,
                    name: elem.logist,
                    order: matchesLogist,
                    sum: sumComPersent100,
                    coeff: coeff
                };

                if (item.select === 'admin') {
                    allRatings.admin.push(dataRating);
                } else if (item.select === 'logist') {
                    allRatings.logist.push(dataRating);
                }
            });
        });

        allRatings.admin.sort((a, b) => b.coeff - a.coeff);
        allRatings.logist.sort((a, b) => b.coeff - a.coeff);

        return allRatings;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function saveAdminLogistRaiting() {
    try {
        const result = await calculateAndCacheData();
        if (result) {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const dateString = `${year}-${month}`;
            const dataToSave = {
                datas: dateString,
                adminandlogist: result
            };
            await AdminLogistRaiting.create(dataToSave);
        }
    } catch (error) {
        console.log(error);
    }
}

async function calculateAndCacheDataWrapper() {
    const result = await calculateAndCacheData();
    cachedData = result;
}

calculateAndCacheDataWrapper();

cron.schedule('*/10 * * * *', async () => {
    try {
        await calculateAndCacheDataWrapper();
    } catch (error) {
        console.error('Ошибка при выполнении вычислений:', error);
    }
});

const calcRaintingLogistAdmin = async (req, res) => {
    try {
        if (!cachedData) {
            await calculateAndCacheData();
        }
        res.json(cachedData);
    } catch (error) {
        console.error('Ошибка при выполнении вычислений:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

export default { calcRaintingLogistAdmin, saveAdminLogistRaiting };