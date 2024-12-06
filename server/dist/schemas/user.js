import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    organisations: [
        {
            organisation: { type: Schema.Types.ObjectId, ref: "Organisation" },
            role: { type: String, enum: ["ADMIN", "EMPLOYEE"], required: true },
        },
    ],
    todo: [
        {
            todo: { type: Schema.Types.ObjectId, ref: "Todo" },
            deadline: { type: Date, required: true },
        },
    ],
}, { timestamps: true });
const User = mongoose.model("User", userSchema);
export default User;
