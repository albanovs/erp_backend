import ModelManagerRaiting from "../../models/raiting/managerraiting/managerraiting.mjs";
import cron from "node-cron";
const createSimTable = async (req, res, Model) => {
    try {
        const { curator } = req.body;
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;

        const newData = new Model({
            data_register: formattedDate,
            curator: curator,
            slot: []
        });

        await newData.save();
        res.status(200).json({ message: JSON.stringify(newData) });
    } catch (error) {
        res.status(500).json({ message: JSON.stringify(error) });
    }
};

const addSlot = async (req, res, Model) => {
    try {
        const { id } = req.body;
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;

        const newData = await Model.findByIdAndUpdate(
            id,
            {
                $push: {
                    slot: {
                        num: 1,
                        number: '',
                        status: '1',
                        logist: '',
                        personal_number: '',
                        date_of_verification: '',
                        days_since_verification: '',
                        status_simCard: '1',
                        physical_simCard: '1',
                        registration: '',
                        WAcod: '',
                        TGcod: '',
                        data_register: formattedDate,
                    }
                }
            },
            { new: true }
        );

        res.status(200).json({ newData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to insert new slot' });
    }
};

const editSimTable = async (req, res, Model, otdel) => {
    const { id } = req.params;
    const {
        number,
        status,
        logist,
        personal_number,
        date_of_verification,
        days_since_verification,
        status_simCard,
        physical_simCard,
        registration,
        WAcod,
        TGcod,
    } = req.body;

    try {
        const updateSimCard = await Model.findOneAndUpdate(
            { "slot._id": id },
            {
                "slot.$.number": number,
                "slot.$.status": status,
                "slot.$.logist": logist,
                "slot.$.personal_number": personal_number,
                "slot.$.date_of_verification": date_of_verification,
                "slot.$.days_since_verification": days_since_verification,
                "slot.$.status_simCard": status_simCard,
                "slot.$.physical_simCard": physical_simCard,
                "slot.$.registration": registration,
                "slot.$.WAcod": WAcod,
                "slot.$.TGcod": TGcod,
            },
            { new: true }
        );

        if (!updateSimCard) {
            return res.status(404).json({ error: "Слот не найден" });
        }
        res.json(updateSimCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Что-то пошло не так" });
    }
};

const getSimTable = async (req, res, Model) => {
    try {
        const data = await Model.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const updateSimcard = async (req, res, Model) => {
    const { itemId, field, value, days_since_verification } = req.body;

    try {
        await Model.findOneAndUpdate(
            { "slot._id": itemId },
            { $set: { [`slot.$.${field}`]: value, "slot.$.days_since_verification": days_since_verification } }
        );

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

const upDateCurator = async (req, res, Model) => {
    const { id } = req.params;
    const { field, value } = req.body;

    try {
        const updatedDocument = await Model.findOneAndUpdate(
            { _id: id },
            { [field]: value },
            { new: true }
        );

        if (!updatedDocument) {
            return res.status(404).json({ error: "Document not found" });
        }

        res.status(200).json(updatedDocument);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const deleteSlot = async (req, res, Model) => {
    const { id } = req.params;

    try {
        const updatedDocument = await Model.findOneAndUpdate(
            { "slot._id": id },
            { $pull: { slot: { _id: id } } },
            { new: true }
        );

        res.json(updatedDocument);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete slot' });
    }
};

const updateDaysSinceVerification = async (Model) => {
    try {
        const today = new Date();
        const data = await Model.find();

        for (const document of data) {
            for (const slot of document.slot) {
                if (slot.date_of_verification) {
                    const selectedDate = new Date(slot.date_of_verification);
                    const timeDiff = today.getTime() - selectedDate.getTime();
                    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    await Model.findOneAndUpdate(
                        { "slot._id": slot._id },
                        { $set: { "slot.$.days_since_verification": daysDiff.toString() } }
                    );
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
};

const deleteManager = async (req, res, Model) => {
    const { id } = req.params;

    try {
        const result = await Model.findByIdAndDelete(id);

        if (result) {
            res.status(200).json({ message: `Document with id ${id} successfully deleted.` });
        } else {
            res.status(404).json({ message: `Document with id ${id} not found.` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete document' });
    }
};

export default {
    createSimTable,
    addSlot,
    getSimTable,
    updateSimcard,
    upDateCurator,
    deleteSlot,
    updateDaysSinceVerification,
    deleteManager,
    editSimTable
}