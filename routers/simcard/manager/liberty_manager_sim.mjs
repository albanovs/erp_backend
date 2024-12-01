import express from "express";
import simController from "../../../controllers/components/simcards_managers.mjs";
import { SimcardLibertyManager } from "../../../models/simcard/managers.mjs";

const router = express.Router();

router.post("/create", (req, res) => simController.createSimTable(req, res, SimcardLibertyManager));
router.post("/add-slot", (req, res) => simController.addSlot(req, res, SimcardLibertyManager));
router.patch("/update/:id", (req, res) => simController.editSimTable(req, res, SimcardLibertyManager, 'Liberty'));
router.get("/data", (req, res) => simController.getSimTable(req, res, SimcardLibertyManager));
router.patch("/updatedays", (req, res) => simController.updateSimcard(req, res, SimcardLibertyManager));
router.patch("/curator/:id", (req, res) => simController.upDateCurator(req, res, SimcardLibertyManager));
router.delete("/delete-slot/:id", (req, res) => simController.deleteSlot(req, res, SimcardLibertyManager));
router.delete("/delete-manager/:id", (req, res) => simController.deleteManager(req, res, SimcardLibertyManager));

export default router;