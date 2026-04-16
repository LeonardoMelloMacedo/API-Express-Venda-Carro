import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        nome: String,
        email: String,
        telephone: Number,
        password: String,
        age: Number,
    },
    { collation: "users" }
);

export default mongoose.model("User", UserSchema);