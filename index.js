import { InstagramSlot, TelegramSlot } from './models/slots/slots.mjs';
import { connect } from './db/db.mjs';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import leader_manager from './routers/simcard/manager/leader_manager_sim.mjs'
import turan_manager from './routers/simcard/manager/turan_manager_sim.mjs'
import monaco_manager from './routers/simcard/manager/monaco_manager_sim.mjs'
import liberty_manager from './routers/simcard/manager/liberty_manager_sim.mjs'

import leader_admin from './routers/simcard/admin/leader_admin_sim.mjs'
import turan_admin from './routers/simcard/admin/turan_admin_sim.mjs'
import monaco_admin from './routers/simcard/admin/monaco_admin_sim.mjs'
import liberty_admin from './routers/simcard/admin/liberty_admin_sim.mjs'


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
connect()

app.use('/leader-manager', leader_manager);
app.use('/leader-admin', leader_admin);
app.use('/turan-manager', turan_manager);
app.use('/turan-admin', turan_admin);
app.use('/monaco-manager', monaco_manager);
app.use('/monaco-admin', monaco_admin);
app.use('/liberty-manager', liberty_manager);
app.use('/liberty-admin', liberty_admin);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});










app.post("/instagam-slot", async (req, res) => {
    try {
        const { account, num } = req.body;
        const myData = new InstagramSlot({ account, num });
        await myData.save();
        res.status(200).json({ message: "Данные успешно добавлены InstagramSlot" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Что-то пошло не так InstagramSlot" });
    }
});

app.patch("/instagam-slot/:id", async (req, res) => {
    const { id } = req.params;
    const { monako, lider, fenix, turan, liberty, fbox } = req.body;

    try {
        const updatedMyModel = await InstagramSlot.findByIdAndUpdate(
            id,
            { monako, lider, fenix, turan, liberty, fbox },
            { new: true }
        );
        res.json(updatedMyModel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка сервера InstagramSlot" });
    }
});

app.post("/insert/instagram", async (req, res) => {
    try {
        const myData = new InstagramSlot({
            account: req.body.account,
            num: 1,
            monako: "",
            fenix: "",
            lider: "",
            turan: "",
            liberty: "",
            fbox: ""
        });
        await myData.save();
        res.status(200).json({ massage: `${JSON.stringify(myData)}` });
    } catch (error) {
        res.status(500).json({ error: "что то пошло не так! InstagramSlot" });
    }
});

app.get("/instagam-slot", async (req, res) => {
    try {
        const data = await InstagramSlot.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: "Что то пошло не так",
        });
    }
});

app.post("/telegramslot", async (req, res) => {
    try {
        const { account, num } = req.body;
        const myData = new TelegramSlot({ account, num });
        await myData.save();
        res.status(200).json({ message: "Данные успешно добавлены" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Что-то пошло не так" });
    }
});

app.patch("/telegramSlot/:id", async (req, res) => {
    const { id } = req.params;
    const { monako, lider, fenix, turan, liberty, fbox } = req.body;

    try {
        const updatedTelegram = await TelegramSlot.findByIdAndUpdate(
            id,
            { monako, lider, fenix, turan, liberty, fbox },
            { new: true }
        );
        res.json(updatedTelegram);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

app.post("/insert/telegram", async (req, res) => {
    try {
        const { account } = req.body;

        for (let i = 1; i <= 20; i++) {
            const myData = new TelegramSlot({
                account,
                num: i,
                monako: "",
                fenix: "",
                lider: "",
                turan: "",
                liberty: "",
                fbox: ""
            });
            await myData.save();
        }

        res.status(200).json({ message: "Слоты успешно созданы" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Что-то пошло не так" });
    }
});
app.get("/test/telegramSlot", async (req, res) => {
    try {
        const data = await TelegramSlot.find().sort({ account: 1, num: 1 });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Что-то пошло не так" });
    }
});