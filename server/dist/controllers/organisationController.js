var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Organisation from "../schemas/organisation";
import User from "../schemas/user";
// Create an Organisation
export const createOrganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, adminId } = req.body;
        if (!name || !adminId) {
            res.status(400).json({ message: "Name and adminId are required" });
            return;
        }
        // Create the organisation
        const organisation = new Organisation({ name, description, admin: adminId });
        const savedOrganisation = yield organisation.save();
        // Update admin's organisation list
        yield User.findByIdAndUpdate(adminId, {
            $push: {
                organisations: { organisation: savedOrganisation._id, role: "ADMIN" },
            },
        });
        res.status(201).json(savedOrganisation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating organisation" });
    }
});
// Get All Organisations
export const getAllOrganisations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organisations = yield Organisation.find().populate("admin", "name email");
        res.status(200).json(organisations);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching organisations" });
    }
});
// Get Organisation by ID
export const getOrganisationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const organisation = yield Organisation.findById(id).populate("admin", "name email");
        if (!organisation) {
            res.status(404).json({ message: "Organisation not found" });
            return;
        }
        res.status(200).json(organisation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching organisation" });
    }
});
// Update Organisation
export const updateOrganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedOrganisation = yield Organisation.findByIdAndUpdate(id, { name, description }, { new: true, runValidators: true });
        if (!updatedOrganisation) {
            res.status(404).json({ message: "Organisation not found" });
            return;
        }
        res.status(200).json(updatedOrganisation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating organisation" });
    }
});
// Delete Organisation
export const deleteOrganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedOrganisation = yield Organisation.findByIdAndDelete(id);
        if (!deletedOrganisation) {
            res.status(404).json({ message: "Organisation not found" });
            return;
        }
        // Remove organisation reference from admin's list
        yield User.updateMany({ "organisations.organisation": id }, { $pull: { organisations: { organisation: id } } });
        res.status(200).json({ message: "Organisation deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting organisation" });
    }
});
