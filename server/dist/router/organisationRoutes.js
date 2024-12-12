import express from "express";
import { createOrganisation, updateOrganisation, getOrganisationById, getAllOrganisations, deleteOrganisation, getOrganisationsByUser } from "../controllers/organisationController.js";
import { addOrganisationIdToRequest, removeOrganisationIdToRequest } from "../middlewares/getOrganizatoin.js";
const router = express.Router();
// Route to get all users
router.get("/getOrganisations", getAllOrganisations);
router.get("/getOrganisations/:id", getOrganisationById);
router.get("/getOrganisation/user", getOrganisationsByUser);
router.post("/createOrganisation", createOrganisation);
router.put("/editOrganisation/:id", updateOrganisation);
router.delete("/deleteOrganisation/:id", deleteOrganisation);
router.post("/selectOrg/:id", addOrganisationIdToRequest);
router.post("/deselectOrg", removeOrganisationIdToRequest);
export default router;
