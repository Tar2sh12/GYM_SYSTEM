import { Router } from "express";
import * as trainer from './trainer.controller.js'
const router = Router();
router.post('/add',trainer.addTrainer);
router.get('/getAll',trainer.getAllTrainers)
router.put('/update',trainer.updateTrainer)
router.delete('/delete',trainer.deleteTrainer)
router.get('/getSpecific',trainer.getspecificTrainer)
export default router;