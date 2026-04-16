import mongoose, { model } from "mongoose";

const CarSchema = new mongoose.Schema(
    {
        model: String,
        brand: String,
        year: Number,
        color: String,
        price: Number,
        available: Boolean,
        plate: String
    },
    { collation: "cars" }
);

export default mongoose.model("Car", CarSchema);