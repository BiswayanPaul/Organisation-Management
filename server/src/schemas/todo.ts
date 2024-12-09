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
        status: {
            type: String,
            enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
            default: "PENDING",
        },
        deadline: {
            type: Date,
            required: [true, "Deadline is required"],
            validate: {
                validator: function (value: Date) {
                    return value > new Date();
                },
                message: "Deadline must be in the future",
            },
        },
        
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "CreatedBy is required"],
        },
        assignedTo: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        organisation: {
            type: Schema.Types.ObjectId,
            ref: "Organisation",
            required: [true, "Organisation is required"],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        
    },
    { timestamps: true }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;
