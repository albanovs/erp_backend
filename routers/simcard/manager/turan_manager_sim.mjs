import express from "express";
import simController from "../../../controllers/components/simcards_managers.mjs";
import { SimcardTuranManager } from "../../../models/simcard/managers.mjs";

const router = express.Router();

router.post("/create", (req, res) => simController.createSimTable(req, res, SimcardTuranManager));
router.post("/add-slot", (req, res) => simController.addSlot(req, res, SimcardTuranManager));
router.patch("/update/:id", (req, res) => simController.editSimTable(req, res, SimcardTuranManager, 'Монако'));
router.get("/data", (req, res) => simController.getSimTable(req, res, SimcardTuranManager));
router.patch("/updatedays", (req, res) => simController.updateSimcard(req, res, SimcardTuranManager));
router.patch("/curator/:id", (req, res) => simController.upDateCurator(req, res, SimcardTuranManager));
router.delete("/delete-slot/:id", (req, res) => simController.deleteSlot(req, res, SimcardTuranManager));
router.delete("/delete-manager/:id", (req, res) => simController.deleteManager(req, res, SimcardTuranManager));

export default router;