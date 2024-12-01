import express from "express";
import simController from "../../../controllers/components/simcards_admins.mjs";
import { SimcardMonacoAdmins } from "../../../models/simcard/admins.mjs";

const router = express.Router();

router.post("/create", (req, res) => simController.createSimTable(req, res, SimcardMonacoAdmins));
router.post("/add-slot", (req, res) => simController.addSlot(req, res, SimcardMonacoAdmins));
router.patch("/update/:id", (req, res) => simController.editSimTable(req, res, SimcardMonacoAdmins, 'Монако'));
router.get("/data", (req, res) => simController.getSimTable(req, res, SimcardMonacoAdmins));
router.patch("/updatedays", (req, res) => simController.updateSimcard(req, res, SimcardMonacoAdmins));
router.patch("/curator/:id", (req, res) => simController.upDateCurator(req, res, SimcardMonacoAdmins));
router.delete("/delete-slot/:id", (req, res) => simController.deleteSlot(req, res, SimcardMonacoAdmins));
router.delete("/delete-manager/:id", (req, res) => simController.deleteManager(req, res, SimcardMonacoAdmins));

export default router;