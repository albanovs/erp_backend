import express from "express";
import simController from "../../../controllers/components/simcards_managers.mjs";
import { SimcardLeaderManager } from "../../../models/simcard/managers.mjs";

const router = express.Router();

router.post("/create", (req, res) => simController.createSimTable(req, res, SimcardLeaderManager));
router.post("/add-slot", (req, res) => simController.addSlot(req, res, SimcardLeaderManager));
router.patch("/update/:id", (req, res) => simController.editSimTable(req, res, SimcardLeaderManager, 'Лидер'));
router.get("/data", (req, res) => simController.getSimTable(req, res, SimcardLeaderManager));
router.patch("/updatedays", (req, res) => simController.updateSimcard(req, res, SimcardLeaderManager));
router.patch("/curator/:id", (req, res) => simController.upDateCurator(req, res, SimcardLeaderManager));
router.delete("/delete-slot/:id", (req, res) => simController.deleteSlot(req, res, SimcardLeaderManager));
router.delete("/delete-manager/:id", (req, res) => simController.deleteManager(req, res, SimcardLeaderManager));

export default router;