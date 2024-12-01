import express from 'express';
const router = express.Router();
import calculateadminlogist from '../../controllers/calculate-adminlogist/calculateadminlogist.mjs';

router.get('/adminlogist-raiting', calculateadminlogist.calcRaintingLogistAdmin)

export default router;