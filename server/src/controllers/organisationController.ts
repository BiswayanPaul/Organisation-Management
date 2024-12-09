import { Request, Response } from "express";
import Organisation from "../schemas/organisation";
import User from "../schemas/user";

// Create an Organisation
export const createOrganisation = async (req: Request, res: Response) => {
    try {
        const { name, description, adminId } = req.body;

        if (!name || !adminId) {
            res.status(400).json({ message: "Name and adminId are required" });
            return;
        }

        // Create the organisation
        const organisation = new Organisation({ name, description, admin: adminId });
        const savedOrganisation = await organisation.save();

        // Update admin's organisation list
        await User.findByIdAndUpdate(adminId, {
            $push: {
                organisations: { organisation: savedOrganisation._id, role: "ADMIN" },
            },
        });

        res.status(201).json(savedOrganisation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating organisation" });
    }
};

// Get All Organisations
export const getAllOrganisations = async (req: Request, res: Response):Promise<void> => {
    try {
        const organisations = await Organisation.find().populate("admin", "name email");
        res.status(200).json(organisations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching organisations" });
    }
};

// Get Organisation by ID
export const getOrganisationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const organisation = await Organisation.findById(id).populate("admin", "name email");

        if (!organisation) {
            res.status(404).json({ message: "Organisation not found" });
            return;
        }

        res.status(200).json(organisation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching organisation" });
    }
};

// Update Organisation
export const updateOrganisation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedOrganisation = await Organisation.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedOrganisation) {
            res.status(404).json({ message: "Organisation not found" });
            return;
        }

        res.status(200).json(updatedOrganisation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating organisation" });
    }
};

// Delete Organisation
export const deleteOrganisation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedOrganisation = await Organisation.findByIdAndDelete(id);

        if (!deletedOrganisation) {
            res.status(404).json({ message: "Organisation not found" });
            return;
        }

        // Remove organisation reference from admin's list
        await User.updateMany(
            { "organisations.organisation": id },
            { $pull: { organisations: { organisation: id } } }
        );

        res.status(200).json({ message: "Organisation deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting organisation" });
    }
};
