import mongoose, { Schema, Document } from "mongoose";

export interface IOrganisation extends Document {
    name: string; // Name of the organisation
    description?: string; // Optional description of the organisation
    createdBy: mongoose.Types.ObjectId; // User ID of the admin who created the organisation
    members: {
        userId: mongoose.Types.ObjectId; // User ID of the member
        role: "ADMIN" | "EMPLOYEE"; // Role of the member in the organisation
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const OrganisationSchema: Schema = new Schema(
    {
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
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

const Organisation = mongoose.model<IOrganisation>(
    "Organisation",
    OrganisationSchema
);

export default Organisation;
