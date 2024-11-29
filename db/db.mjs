import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://erpdostup:wGhrqGT6q8VXPE6x@erpsystem.1afsk.mongodb.net/?retryWrites=true&w=majority&appName=erpsystem'
        );
        console.log('DB connected');
    } catch (error) {
        console.log(error);
    }
}