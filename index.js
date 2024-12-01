import { InstagramSlot, TelegramSlot } from './models/slots/slots.mjs';
import { connect } from './db/db.mjs';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import User from './models/auth/user.mjs';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
connect()

// Старшие менеджеры и байеры SIM

import leader_manager from './routers/simcard/manager/leader_manager_sim.mjs'
import turan_manager from './routers/simcard/manager/turan_manager_sim.mjs'
import monaco_manager from './routers/simcard/manager/monaco_manager_sim.mjs'
import liberty_manager from './routers/simcard/manager/liberty_manager_sim.mjs'

app.use('/monaco/manager', monaco_manager);
app.use('/liberty/manager', liberty_manager);
app.use('/turan/manager', turan_manager);
app.use('/leader/manager', leader_manager);

// Старшие админы и помощники старших админов SIM

import leader_admin from './routers/simcard/admin/leader_admin_sim.mjs'
import turan_admin from './routers/simcard/admin/turan_admin_sim.mjs'
import monaco_admin from './routers/simcard/admin/monaco_admin_sim.mjs'
import liberty_admin from './routers/simcard/admin/liberty_admin_sim.mjs'
import ilyas_admin from './routers/simcard/admin/ilyas_admin_sim.mjs'

// Админы логисты SIM

import sim_admin_logist from './routers/simcard/logistandadmin/logistadmin.mjs'

app.use('/turan/admin', turan_admin);
app.use('/leader/admin', leader_admin);
app.use('/monaco/admin', monaco_admin);
app.use('/liberty/admin', liberty_admin);
app.use('/ilyas/admin', ilyas_admin);

app.use('/', sim_admin_logist);

// Создание ежедневных отчетов

import leader_otchet from './routers/otchet/leader.mjs'
import turan_otchet from './routers/otchet/turan.mjs'
import monaco_otchet from './routers/otchet/monaco.mjs'
import liberty_otchet from './routers/otchet/liberty.mjs'

app.use('/turan/otchet', turan_otchet);
app.use('/leader/otchet', leader_otchet);
app.use('/monaco/otchet', monaco_otchet);
app.use('/liberty/otchet', liberty_otchet);

// Рейтинг, статистика и прочее

import rating from './routers/raiting/manager.mjs'
import admin_logist from './routers/raiting/logist_admin.mjs'

app.use('/raiting-manager', rating);
app.use('/', admin_logist);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// Интсаграм телеграм слоты


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


// авторизация и регистрация

app.post("/register", async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();
        res.status(200).json({ message: "Пользователь успешно зарегистрирован" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Что-то пошло не так" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Пользователь не найден" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Неверный пароль" });
        }

        const roles = await User.findOne({ username })
        res.status(200).json({ roles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Что-то пошло не так" });
    }
});

app.delete('/login/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "Пользователь успешно удален" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Что-то пошло не так" });
    }
});