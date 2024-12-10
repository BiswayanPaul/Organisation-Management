import { Request, Response } from "express";
import Organisation from "../schemas/organisation.js";
import { CustomRequest } from "../types/CustomRequest.js";
import User from "../schemas/user.js";
import mongoose from "mongoose";

// Create an Organisation
export const createOrganisation = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId; // Get the user ID from the request
        const userEmail = req.userEmail; // Get the user email from the request
        // console.log({userId, userEmail})
        if (!userId || !userEmail) {
            res.status(400).json({ message: "User ID, Email is required i.e Unauthorized" });
            return;
        }


        const { name, description } = req.body;
        console.log({name,description})

        if (!name) {
            res.status(400).json({ message: "Name and adminId are required" });
            return;
        }

        const existingOrg = await Organisation.findOne({name})
        // console.log(existingOrg);

        if(existingOrg){
            res.status(400).json({ message: "Org with the same name already exist" });
            return;
        }

        // Create the organisation
        const organisation = new Organisation({ name, description, admin: userId, createdBy: userId });
        const savedOrganisation = await organisation.save();

        // Update admin's organisation list
        await User.findByIdAndUpdate(userId, {
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
export const getAllOrganisations = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId; // Get the user ID from the request
        const userEmail = req.userEmail; // Get the user email from the request
        // console.log({userId, userEmail})
        if (!userId || !userEmail) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const organisations = await Organisation.find()
        res.status(200).json(organisations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching organisations" });
    }
};

// Get Organisation by ID
export const getOrganisationById = async (req: CustomRequest, res: Response) => {
    try {

        const userId = req.userId; // Get the user ID from the request
        const userEmail = req.userEmail; // Get the user email from the request
        // console.log({userId, userEmail})
        if (!userId || !userEmail) {
            res.status(400).json({ message: "User ID, Email is required i.e Unauthorized" });
            return;
        }

        const { id } = req.params;
        const organisation = await Organisation.findById(id);

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

// Get All Organisations of a User
export const getOrganisationsByUser = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId; // Get the user ID from the request
        const userEmail = req.userEmail; // Get the user email from the request
        // console.log({userId, userEmail})
        if (!userId || !userEmail) {
            res.status(400).json({ message: "User ID, Email is required i.e Unauthorized" });
            return;
        }

        const org = await Organisation.find({ createdBy: userId});

        res.status(200).json(org)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching organisations for user" });
    }
};

// Update Organisation
export const updateOrganisation = async (req: CustomRequest, res: Response) => {
    try {

        const userId = req.userId; // Get the user ID from the request
        const userEmail = req.userEmail; // Get the user email from the request
        // console.log({userId, userEmail})
        if (!userId || !userEmail) {
            res.status(400).json({ message: "User ID, Email is required i.e Unauthorized" });
            return;
        }
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
export const deleteOrganisation = async (req: CustomRequest, res: Response) => {
    try {

        const userId = req.userId; // Get the user ID from the request
        const userEmail = req.userEmail; // Get the user email from the request
        // console.log({userId, userEmail})
        if (!userId || !userEmail) {
            res.status(400).json({ message: "User ID, Email is required i.e Unauthorized" });
            return;
        }
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
