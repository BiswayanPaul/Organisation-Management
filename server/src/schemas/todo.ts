import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
    title: string; // Title of the todo
    description?: string; // Optional description
    isCompleted: boolean; // Status of the todo
    deadline: Date; // Deadline for the todo
    createdBy: mongoose.Types.ObjectId; // Reference to the user who created this todo
    assignedTo: mongoose.Types.ObjectId; // Reference to the user to whom the todo is assigned
    organisation: mongoose.Types.ObjectId; // Reference to the organisation under which the todo is listed
    createdAt: Date; // Timestamp when the todo was created
    updatedAt: Date; // Timestamp when the todo was last updated
}

const todoSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
        },
        isCompleted: {
            type: Boolean,
            default: false, // Default is not completed
        },
        deadline: {
            type: Date,
            required: [true, "Deadline is required"],
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "CreatedBy is required"],
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        organisation: {
            type: Schema.Types.ObjectId,
            ref: "Organisation",
            required: [true, "Organisation is required"],
        },
    },
    { timestamps: true }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;
