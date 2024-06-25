import { Router } from "express";
import * as member from './member.controller.js';
const router = Router();
router.post('/add',member.addMember);
router.get('/getall',member.getall);
router.get('/getspecific',member.getById);
router.put('/update',member.updateMember);
router.delete('/delete',member.deleteMember)
export default router;