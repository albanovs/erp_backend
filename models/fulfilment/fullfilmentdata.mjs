import mongoose from "mongoose";

const FullfilmentDataSchema = new mongoose.Schema({
    date: String,
    otchet: [{
        date: String,
        clients: String,
        services: String,
        packages: Number,
        count_product: Number,
        sum_itog: Number,
        obslujival: String,
        expenses: Number,
        sum_arrived: Number
    }],
    itogs: {
        all_expenses: Number,
        itog100: Number
    }

})

const FullfilmentdataModel = mongoose.model('fullfilment-data', FullfilmentDataSchema)

export default FullfilmentdataModel;