import { LeaderDataModel, MonacoDataModel, TuranDataModel, LibertyDataModel } from '../../models/data_otchet/data.mjs';
import cron from 'node-cron'

let cachedData = null

async function calculateAndCacheData() {
    let itogs = {
        otdel: {
            lider: [],
            monaco: [],
            turan: [],
            liberty: []
        },
        totalAllItog: {
            lider: {
                itog: 0,
                index: 0,
                allItog: 0,
                percentItog: 0,
                percentIndex: 0,
            },
            monaco: {
                itog: 0,
                index: 0,
                allItog: 0,
                percentItog: 0,
                percentIndex: 0,
            },
            turan: {
                itog: 0,
                index: 0,
                allItog: 0,
                percentItog: 0,
                percentIndex: 0,
            },
            liberty: {
                itog: 0,
                index: 0,
                allItog: 0,
                percentItog: 0,
                percentIndex: 0,
            },
            allItogs: {
                itog: 0,
                itogIndex: 0,
                allItog: 0,
            },
        },
    }

    try {
        const [leaderData, monacoData, turanData, libertyData] = await Promise.all([
            LeaderDataModel.find(),
            MonacoDataModel.find(),
            TuranDataModel.find(),
            LibertyDataModel.find(),
        ]);

        const currentMonth = new Date().toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });

        const filterDataByCurrentMonth = (data) => {
            return data.filter((item) => {
                const itemDate = item.date;
                const itemMonthYear = itemDate.split('.').slice(1).join('/');
                return itemMonthYear === currentMonth;
            });
        };

        const filteredLiderData = filterDataByCurrentMonth(leaderData);
        const filteredMonacoData = filterDataByCurrentMonth(monacoData);
        const filteredTuranData = filterDataByCurrentMonth(turanData);
        const filteredLibertyData = filterDataByCurrentMonth(libertyData);

        itogs.otdel.lider = filteredLiderData
        itogs.otdel.monaco = filteredMonacoData
        itogs.otdel.turan = filteredTuranData
        itogs.otdel.liberty = filteredLibertyData

        const calculateTotalAllItog = (data) => {
            return data.reduce((acc, elem) => {
                const itogSum = elem.itog.reduce((subAcc, item) => {
                    return subAcc + item.allItog;
                }, 0);
                const itogIndexSum = elem.itog.reduce((subAcc, item) => {
                    return subAcc + item.allItogIndex;
                }, 0);
                return {
                    itog: acc.itog + itogSum,
                    index: acc.index + itogIndexSum,
                    allItog: acc.allItog + itogSum + itogIndexSum,
                };
            }, { itog: 0, index: 0, allItog: 0 });
        };


        itogs.totalAllItog.lider = calculateTotalAllItog(filteredLiderData)
        itogs.totalAllItog.monaco = calculateTotalAllItog(filteredMonacoData)
        itogs.totalAllItog.turan = calculateTotalAllItog(filteredTuranData)
        itogs.totalAllItog.liberty = calculateTotalAllItog(filteredLibertyData)
        itogs.totalAllItog.allItogs = calculateTotalAllItog(
            [...filteredLiderData,
            ...filteredMonacoData,
            ...filteredTuranData,
            ...filteredLibertyData
            ])

        const allPercentIndex = (itogs.totalAllItog.lider.index + itogs.totalAllItog.monaco.index +
            itogs.totalAllItog.turan.index + itogs.totalAllItog.liberty.index)

        const allPercentComission = (itogs.totalAllItog.lider.itog + itogs.totalAllItog.monaco.itog
            + itogs.totalAllItog.turan.itog + itogs.totalAllItog.liberty.itog)

        itogs.totalAllItog.lider.percentIndex = ((itogs.totalAllItog.lider.index / allPercentIndex) * 100).toFixed(0)
        itogs.totalAllItog.monaco.percentIndex = ((itogs.totalAllItog.monaco.index / allPercentIndex) * 100).toFixed(0)
        itogs.totalAllItog.turan.percentIndex = ((itogs.totalAllItog.turan.index / allPercentIndex) * 100).toFixed(0)
        itogs.totalAllItog.liberty.percentIndex = ((itogs.totalAllItog.liberty.index / allPercentIndex) * 100).toFixed(0)
        itogs.totalAllItog.lider.percentItog = ((itogs.totalAllItog.lider.itog / allPercentComission) * 100).toFixed(0)
        itogs.totalAllItog.monaco.percentItog = ((itogs.totalAllItog.monaco.itog / allPercentComission) * 100).toFixed(0)
        itogs.totalAllItog.turan.percentItog = ((itogs.totalAllItog.turan.itog / allPercentComission) * 100).toFixed(0)
        itogs.totalAllItog.liberty.percentItog = ((itogs.totalAllItog.liberty.itog / allPercentComission) * 100).toFixed(0)

        return itogs

    } catch (error) {
        console.error('Ошибка при выполнении вычислений: calculateAndCacheData itogs', error);
    }
}

async function calculateAndCacheDataCash() {
    const result = await calculateAndCacheData();
    cachedData = result;
}

calculateAndCacheDataCash();

cron.schedule('*/10 * * * *', async () => {
    try {
        await calculateAndCacheDataCash();
    } catch (error) {
        console.error('Ошибка при выполнении вычислений: calculateAndCacheData itogs', error);
    }
});

const calcItogs = async (req, res) => {
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

LeaderDataModel.on('change', async () => {
    await calculateAndCacheDataCash();
});
MonacoDataModel.on('change', async () => {
    await calculateAndCacheDataCash();
});
TuranDataModel.on('change', async () => {
    await calculateAndCacheDataCash();
});
IlyasDataModel.on('change', async () => {
    await calculateAndCacheDataCash();
});
LibertyDataModel.on('change', async () => {
    await calculateAndCacheDataCash();
});

export default { calcItogs };