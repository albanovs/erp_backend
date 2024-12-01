import express from "express";
import simController from "../../../controllers/components/simcards_managers.mjs";
import { SimcardMonacoManager } from "../../../models/simcard/managers.mjs";

const router = express.Router();

router.post("/create", (req, res) => simController.createSimTable(req, res, SimcardMonacoManager));
router.post("/add-slot", (req, res) => simController.addSlot(req, res, SimcardMonacoManager));
router.patch("/update/:id", (req, res) => simController.editSimTable(req, res, SimcardMonacoManager, 'Монако'));
router.get("/data", (req, res) => simController.getSimTable(req, res, SimcardMonacoManager));
router.patch("/updatedays", (req, res) => simController.updateSimcard(req, res, SimcardMonacoManager));
router.patch("/curator/:id", (req, res) => simController.upDateCurator(req, res, SimcardMonacoManager));
router.delete("/delete-slot/:id", (req, res) => simController.deleteSlot(req, res, SimcardMonacoManager));
router.delete("/delete-manager/:id", (req, res) => simController.deleteManager(req, res, SimcardMonacoManager));

export default router;