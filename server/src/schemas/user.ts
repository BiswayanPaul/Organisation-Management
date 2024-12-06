import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string; // User's name
    email: string; // User's email address
    password: string; // User's hashed password
    organisations: {
        organisation: mongoose.Types.ObjectId; // Reference to an organisation
        role: "ADMIN" | "EMPLOYEE"; // Role of the user in the organisation
    }[];
    todo: {
        todo: mongoose.Types.ObjectId; // Reference to a todo item
        deadline: Date; // Deadline for the todo
    }[];
    createdAt: Date; // Timestamp when the user was created
    updatedAt: Date; // Timestamp when the user was last updated
}

const userSchema: Schema = new Schema(
    {
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
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
