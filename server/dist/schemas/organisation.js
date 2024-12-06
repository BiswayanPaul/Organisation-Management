import mongoose, { Schema } from "mongoose";
const OrganisationSchema = new Schema({
    name: {
        type: String,
        required: [true, "Organisation name is required"],
        unique: true, // Ensure organisation names are unique
        trim: true,
    },
    description: {
        type: String,
        default: "",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: [true, "Organisation must have a creator"],
    },
    members: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference to the User model
                required: true,
            },
            role: {
                type: String,
                enum: ["ADMIN", "EMPLOYEE"], // Allowed roles
                required: true,
            },
        },
    ],
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});
const Organisation = mongoose.model("Organisation", OrganisationSchema);
export default Organisation;
