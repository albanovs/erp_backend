import {
    SimcardLeaderManager,
    SimcardLibertyManager,
    SimcardMonacoManager,
    SimcardTuranManager
} from "../../models/simcard/managers.mjs";
import ModelManagerRaiting from "../../models/raiting/managerraiting/managerraiting.mjs";


const createMonthlyReport = async () => {
    try {
        const currentDate = new Date().toISOString().slice(0, 7);

        const existingReport = await ModelManagerRaiting.findOne({ datas: currentDate });

        if (existingReport) {
            console.log(`Документ с датой ${currentDate} уже существует.`);
            return;
        }

        const simModels = [
            { model: SimcardLeaderManager, teamName: 'Лидер' },
            { model: SimcardMonacoManager, teamName: 'Ильяс' },
            { model: SimcardLibertyManager, teamName: 'Liberty' },
            { model: SimcardMonacoManager, teamName: 'Монако' },
            { model: SimcardTuranManager, teamName: 'Туран' }
        ];

        let managersArray = [];

        for (const { model: SimModel, teamName } of simModels) {
            const simData = await SimModel.find();

            simData.forEach(sim => {
                const manager = {
                    otdel: teamName,
                    curator: sim.curator,
                    data_register: sim.data_register || 'до 09.05.2024',
                    buyerLength: sim.slot.filter(slot => slot.status === "2" && slot.buyer !== "").length,
                    totalcom: 0,
                    order: 0,
                    comission: 0,
                    comissionVM: 0,
                    allCoeff: '',
                    detail: sim.slot
                        .filter(slot => slot.status === "2" && slot.buyer !== "")
                        .map(slot => ({
                            name: slot.buyer,
                            status: slot.status,
                            orders: 0,
                            summa: 0,
                            team: teamName,
                            curator: sim.curator,
                            coeff: 0,
                            data_register: slot.data_register || 'до 09.05.2024'
                        })),
                    remainder: 0,
                    for_withdrawal: [],
                };

                if (manager.detail.length > 0) {
                    managersArray.push(manager);
                }
            });
        }

        const newRaiting = new ModelManagerRaiting({
            datas: currentDate,
            managers: managersArray
        });

        await newRaiting.save();
        console.log('Документ успешно создан');
    } catch (err) {
        console.error('Ошибка при создании документа:', err);
    }
};

const updateWithdrawal = async (req, res) => {
    const { managerId, summa } = req.body;
    try {
        const currentDate = new Date();
        const report = await ModelManagerRaiting.findOne({ "managers._id": managerId });
        if (!report) {
            console.error('Менеджер не найден');
            return;
        }
        const manager = report.managers.id(managerId);
        manager.for_withdrawal.push({
            summa: summa,
            date: currentDate
        });
        const totalWithdrawal = manager.for_withdrawal.reduce((acc, item) => acc + item.summa, 0);
        manager.remainder = manager.comission - totalWithdrawal;
        await report.save();
        res.status(200).json({ message: 'Вывод средств успешно обновлён' });
    } catch (err) {
        console.error('Ошибка при обновлении документа:', err);
    }
};

// const updateFenixDataFromDB = async () => {
//     try {
//         const currentDate = new Date().toISOString().slice(0, 7);
//         const FenixManagers = await ModelManagerRaiting.find({ datas: currentDate });
//         let SelectedManagers = FenixManagers.map(elem => elem.managers).flat()

//         const dataArray = await LiderDataModel.find({ date: "18.11.2024" });
//         if (!dataArray || dataArray.length === 0) {
//             console.log('Данные Fenix не найдены');
//             return;
//         }

//         for (const data of dataArray) {
//             for (let manager of SelectedManagers) {
//                 let totalOrdersForCurator = 0;
//                 let totalOrdersForDetails = 0;
//                 let totalSumForCurator = 0;
//                 let totalSumForDetails = 0;
//                 let totalComPersent100ForDetails = 0;

//                 const curatorOrders = data.otchet.filter(otchet =>
//                     otchet.buyer.replace(/\s/g, '').toLowerCase() === manager.curator.replace(/\s/g, '').toLowerCase()
//                 );

//                 totalOrdersForCurator = curatorOrders.length;
//                 totalSumForCurator = curatorOrders.reduce((sum, report) => sum + report.itog, 0);

//                 manager.detail = manager.detail.map(detail => {
//                     const matchingOrders = data.otchet.filter(otchet =>
//                         otchet.buyer.replace(/\s/g, '').toLowerCase() === detail.name.replace(/\s/g, '').toLowerCase()
//                     );

//                     if (matchingOrders.length > 0) {
//                         const totalMatchingSum = matchingOrders.reduce((sum, report) => sum + report.itog, 0);
//                         totalOrdersForDetails += matchingOrders.length;
//                         totalSumForDetails += totalMatchingSum;

//                         detail.summa = (detail.summa || 0) + totalMatchingSum;
//                         detail.orders = (detail.orders || 0) + matchingOrders.length;
//                         detail.coeff = (parseFloat(detail.coeff) || 0) + ((parseFloat(totalMatchingSum) / parseFloat(matchingOrders.length)).toFixed(0) / 1000).toFixed(2)
//                         const comPersent100Sum = matchingOrders.reduce((sum, report) => sum + report.comPersent100, 0);
//                         totalComPersent100ForDetails += comPersent100Sum;
//                     }
//                     return detail;
//                 });

//                 if (totalOrdersForCurator > 0) {
//                     manager.order = (manager.order || 0) + totalOrdersForCurator;
//                     manager.totalcom = (manager.totalcom || 0) + totalSumForCurator;
//                 }

//                 if (totalOrdersForDetails > 0) {
//                     manager.order = (manager.order || 0) + totalOrdersForDetails;
//                     manager.totalcom = (manager.totalcom || 0) + totalSumForDetails;
//                 }

//                 manager.comission = parseFloat((manager.comission || 0)) + Math.round(totalComPersent100ForDetails * 0.07);
//                 manager.remainder = parseFloat((manager.remainder || 0)) + Math.round(totalComPersent100ForDetails * 0.07);
//                 manager.comissionVM = manager.curator.includes('ВМ') ? 0 : parseFloat((manager.comissionVM || 0)) + Math.round(totalComPersent100ForDetails * 0.03);
//                 manager.allCoeff = (parseFloat((manager.allCoeff || 0)) + (parseFloat((totalOrdersForCurator + totalOrdersForDetails)) / manager.buyerLength) + parseFloat((totalComPersent100ForDetails / manager.buyerLength)) / 1000).toFixed(1);

//                 await ModelManagerRaiting.updateOne(
//                     { 'managers._id': manager._id },
//                     {
//                         $set: {
//                             'managers.$.detail': manager.detail,
//                             'managers.$.totalcom': manager.totalcom,
//                             'managers.$.order': manager.order,
//                             'managers.$.comission': manager.comission,
//                             'managers.$.comissionVM': manager.comissionVM,
//                             'managers.$.allCoeff': manager.allCoeff
//                         }
//                     }
//                 );
//             }
//         }

//         console.log('Обновление данных завершено 05.10.2024');
//     } catch (error) {
//         console.error('Ошибка при обновлении данных:', error);
//     }
// };

const getBuyerRaiting = async (req, res) => {
    try {
        const currentDate = new Date().toISOString().slice(0, 7);
        const managers = await ModelManagerRaiting.find({ datas: currentDate });
        const allDetails = [];

        managers.forEach(manager => {
            manager.managers.forEach(manager => {
                allDetails.push(...manager.detail);
            })
        });
        allDetails.sort((a, b) => b.coeff - a.coeff);
        res.status(200).json(allDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Что-то пошло не так" });
    }
};

const getAllManagers = async (req, res) => {
    try {
        const managers = await ModelManagerRaiting.find();
        res.status(200).json(managers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Что-то пошло не так" });
    }
};

export default { createMonthlyReport, updateWithdrawal, getAllManagers, getBuyerRaiting };