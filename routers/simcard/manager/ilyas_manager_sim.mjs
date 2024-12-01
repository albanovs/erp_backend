import express from "express";
import simController from "../../../controllers/components/simcards_managers.mjs";
import { SimcardIlyasManager } from "../../../models/simcard/managers.mjs";

const router = express.Router();

router.post("/create", (req, res) => simController.createSimTable(req, res, SimcardIlyasManager));
router.post("/add-slot", (req, res) => simController.addSlot(req, res, SimcardIlyasManager));
router.patch("/update/:id", (req, res) => simController.editSimTable(req, res, SimcardIlyasManager, 'Ильяс'));
router.get("/data", (req, res) => simController.getSimTable(req, res, SimcardIlyasManager));
router.patch("/updatedays", (req, res) => simController.updateSimcard(req, res, SimcardIlyasManager));
router.patch("/curator/:id", (req, res) => simController.upDateCurator(req, res, SimcardIlyasManager));
router.delete("/delete-slot/:id", (req, res) => simController.deleteSlot(req, res, SimcardIlyasManager));
router.delete("/delete-manager/:id", (req, res) => simController.deleteManager(req, res, SimcardIlyasManager));

export default router;