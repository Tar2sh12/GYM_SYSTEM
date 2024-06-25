import { Router } from "express";
import * as stat from './statistics.controller.js';
const router=Router();
router.get('/All',stat.getAllrevenues);
router.get('/revenueOfTrainer',stat.revenueOfTrainer)
export default router;