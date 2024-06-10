import { Router } from "express";
import { createUser, updateUser, getUsers } from "../controllers/userController.js";

const router = Router()

// router.post('/users', createUser)
router.post('/users', (req, res, next) => {
    console.log('Received POST request at /users with body:', JSON.stringify(req.body, null, 2))
    next();
  }, createUser);
router.put('/users/:id', updateUser)
router.get('/users', getUsers)

export default router