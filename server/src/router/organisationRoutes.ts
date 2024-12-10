import express from "express";
import { createOrganisation, updateOrganisation,getOrganisationById, getAllOrganisations, deleteOrganisation, getOrganisationsByUser } from "../controllers/organisationController.js";

const router = express.Router();

// Route to get all users
router.get("/getOrganisations", getAllOrganisations);
router.get("/getOrganisations/:id", getOrganisationById);
router.get("/getOrganisation/user", getOrganisationsByUser);
router.post("/createOrganisation", createOrganisation);
router.put("/editOrganisation/:id", updateOrganisation);
router.delete("/deleteOrganisation/:id",deleteOrganisation );

export default router;
