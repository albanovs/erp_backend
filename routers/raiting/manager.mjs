import express from 'express';
const router = express.Router();
import managerRaiting from '../../controllers/raiting/manager.mjs';

router.get('/data', managerRaiting.getAllManagers)
router.patch('/percent', managerRaiting.updateWithdrawal)
router.get('/buyer', managerRaiting.getBuyerRaiting)

export default router;