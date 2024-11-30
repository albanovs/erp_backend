
const createDefaultDocument = async (req, res, model) => {
    try {
        const existingDocument = await model.findOne();
        if (existingDocument) {
            return res.status(200).json({ message: 'Документ уже существует' });
        }

        const otchetArray = [];
        for (let i = 1; i <= 30; i++) {
            otchetArray.push({
                list: i,
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
            });
        }

        const newotchet = new model({
            otchet: otchetArray,
            itog: [{
                ros1: '',
                ros2: '',
                ros3: '',
                ros4: '',
                ros5: '',
                sum1: 0,
                sum2: 0,
                sum3: 0,
                sum4: 0,
                sum5: 0,
                allItogIndex: 0,
                allItog: 0,
                allItogPrihod: 0,
                allItogUhod: 0,
                otdelRuk: 0,
                itogs: 0
            }]
        });

        await newotchet.save();

        res.status(200).json({ message: 'Документ успешно создан' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при создании документа' });
    }
};



const updateDocument = async (req, res, model, schemaPath) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updateObj = {};

        for (let field in updates) {
            if (schemaPath) {
                updateObj[`${schemaPath}.$.${field}`] = updates[field];
            } else {
                updateObj[field] = updates[field];
            }
        }

        const updatedDoc = await model.findOneAndUpdate(
            { [`${schemaPath}._id`]: id },
            { $set: updateObj },
            { new: true }
        );

        if (!updatedDoc) {
            return res.status(404).json({ error: 'Элемент не найден' });
        }

        res.json(updatedDoc);
    } catch (error) {
        console.error('Ошибка при обновлении:', error);
        res.status(500).json({ error: 'Ошибка при обновлении документа' });
    }
};



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
    } catch (error) {
        console.error(error);
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
