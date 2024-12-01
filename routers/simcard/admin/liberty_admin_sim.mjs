import express from "express";
import simController from "../../../controllers/components/simcards_admins.mjs";
import { SimcardLibertyAdmins } from "../../../models/simcard/admins.mjs";

const router = express.Router();

router.post("/create", (req, res) => simController.createSimTable(req, res, SimcardLibertyAdmins));
router.post("/add-slot", (req, res) => simController.addSlot(req, res, SimcardLibertyAdmins));
router.patch("/update/:id", (req, res) => simController.editSimTable(req, res, SimcardLibertyAdmins, 'Liberty'));
router.get("/data", (req, res) => simController.getSimTable(req, res, SimcardLibertyAdmins));
router.patch("/updatedays", (req, res) => simController.updateSimcard(req, res, SimcardLibertyAdmins));
router.patch("/curator/:id", (req, res) => simController.upDateCurator(req, res, SimcardLibertyAdmins));
router.delete("/delete-slot/:id", (req, res) => simController.deleteSlot(req, res, SimcardLibertyAdmins));
router.delete("/delete-manager/:id", (req, res) => simController.deleteManager(req, res, SimcardLibertyAdmins));

export default router;