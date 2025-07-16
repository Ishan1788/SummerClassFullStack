import{Router} from 'express';
const router = Router();
import {register, login, allUsers } from '../controllers/auth.controller.js'

router.post('/register', register);
router.post('/login', login);
router.get('/allUsers', allUsers );
export default router;