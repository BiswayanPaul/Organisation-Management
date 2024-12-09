import mongoose, { Schema } from "mongoose";
const todoSchema = new Schema({
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
            validator: function (value) {
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
}, { timestamps: true });
const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
