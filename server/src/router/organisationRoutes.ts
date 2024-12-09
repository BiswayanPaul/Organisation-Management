import express from "express";
import { createOrganisation, updateOrganisation,getOrganisationById, getAllOrganisations, deleteOrganisation } from "../controllers/organisationController";

const router = express.Router();

// Route to get all users
router.get("/getOrganisations", getAllOrganisations);
router.get("/getOrganisations/:id", getOrganisationById);
router.post("/createOrganisation", createOrganisation);
router.put("/editOrganisation/:id", updateOrganisation);
router.delete("/deleteOrganisation/:id",deleteOrganisation );

export default router;
