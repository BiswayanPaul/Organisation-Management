import mongoose, { Schema } from "mongoose";
const todoSchema = new Schema({
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
}, { timestamps: true });
const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
