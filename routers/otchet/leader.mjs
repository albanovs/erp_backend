import { Router } from "express";
import controller from "../../controllers/leader/otchet.mjs"
import datacontroller from '../../controllers/leader/data.mjs'

const router = Router();

router.post('/create', controller.createDefaultDocument);
router.patch('/update-otchet/:id', controller.updateOtchetBeta);
router.patch('/update-itog/:id', controller.updateItogBeta);
router.get('/data', controller.getOtchetBeta);
router.delete('/delete', controller.deleteOtchetBeta);
router.post('/insert', controller.addSlotOtchet);
router.get('/all-data', datacontroller.getData);
router.post('/add-data', datacontroller.createData);

export default router;