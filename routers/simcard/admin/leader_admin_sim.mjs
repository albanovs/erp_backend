import express from "express";
import simController from "../../../controllers/components/simcards_admins.mjs";
import { SimcardLeaderAdmins } from "../../../models/simcard/admins.mjs";

const router = express.Router();

router.post("/create", (req, res) => simController.createSimTable(req, res, SimcardLeaderAdmins));
router.post("/add-slot", (req, res) => simController.addSlot(req, res, SimcardLeaderAdmins));
router.patch("/update", (req, res) => simController.editSimTable(req, res, SimcardLeaderAdmins, 'Лидер'));
router.get("/data", (req, res) => simController.getSimTable(req, res, SimcardLeaderAdmins));
router.patch("/updatedays", (req, res) => simController.updateSimcard(req, res, SimcardLeaderAdmins));
router.patch("/curator/:id", (req, res) => simController.upDateCurator(req, res, SimcardLeaderAdmins));
router.delete("/delete-slot/:id", (req, res) => simController.deleteSlot(req, res, SimcardLeaderAdmins));
router.delete("/delete-manager/:id", (req, res) => simController.deleteManager(req, res, SimcardLeaderAdmins));

export default router;