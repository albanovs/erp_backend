import express from "express";
import simController from "../../../controllers/components/simcards_admins.mjs";
import { SimcardTuranAdmins } from "../../../models/simcard/admins.mjs";

const router = express.Router();

router.post("/create", (req, res) => simController.createSimTable(req, res, SimcardTuranAdmins));
router.post("/add-slot", (req, res) => simController.addSlot(req, res, SimcardTuranAdmins));
router.patch("/update", (req, res) => simController.editSimTable(req, res, SimcardTuranAdmins, 'Монако'));
router.get("/data", (req, res) => simController.getSimTable(req, res, SimcardTuranAdmins));
router.patch("/updatedays", (req, res) => simController.updateSimcard(req, res, SimcardTuranAdmins));
router.patch("/curator/:id", (req, res) => simController.upDateCurator(req, res, SimcardTuranAdmins));
router.delete("/delete-slot/:id", (req, res) => simController.deleteSlot(req, res, SimcardTuranAdmins));
router.delete("/delete-manager/:id", (req, res) => simController.deleteManager(req, res, SimcardTuranAdmins));

export default router;