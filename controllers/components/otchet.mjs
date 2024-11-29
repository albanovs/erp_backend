
const createDefaultDocument = async (req, res, model) => {
    try {
        const newDocument = new model();
        await newDocument.save();
        res.status(201).json({ message: "Документ успешно создан createDefaultDocument" });
    } catch (error) {
        console.error(error);
        res.status(403).json({ error: "Что-то пошло не так createDefaultDocument" });
    }
}

const updateDocument = async (req, res, model, schemaPath) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updateObj = {};

        for (let field in updates) {
            if (field.startsWith('otchet') || field.startsWith('itog')) {
                updateObj[`${schemaPath}.${field}`] = updates[field];
            } else {
                updateObj[field] = updates[field];
            }
        }

        const updatedDoc = await model.findOneAndUpdate(
            { [`${schemaPath}._id`]: id },
            updateObj,
            { new: true }
        );

        if (!updatedDoc) {
            return res.status(404).json({ error: 'Элемент не найден updateDocument' });
        }

        res.json(updatedDoc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Произошла ошибка при обновлении данных updateDocument' });
    }
}


const getData = async (req, res, model) => {
    try {
        const data = await model.find();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Что-то пошло не так getData",
        });
    }
};

const deleteData = async (req, res, model) => {
    try {
        await model.deleteMany();
        res.status(200).json({ message: 'Коллекция успешно удалена deleteData' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Произошла ошибка при удалении коллекции deleteData' });
    }
};

const addSlot = async (req, res, model, fieldName) => {
    try {
        const { id } = req.body;
        const defaultSlotData = {
            list: 1,
            sm: 1,
            sity: '',
            admin: '',
            buyer: '',
            comPersent100: 0,
            comPersent2: 0,
            comPersent3: 0,
            comPersent4: 0,
            indexPersent100: 0,
            indexPersent2: 0,
            indexPersent3: 0,
            indexPersent4: 0,
            uhod: 0,
            prihod: 0,
            itog: 0,
            itogIndex: 0
        };
        const newData = await model.findByIdAndUpdate(
            id,
            {
                $push: {
                    [fieldName]: [defaultSlotData]
                }
            },
            { new: true }
        );

        res.status(200).json({ newData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to insert new slot addSlot" });
    }
};



export {
    createDefaultDocument,
    updateDocument,
    getData,
    deleteData,
    addSlot
};
