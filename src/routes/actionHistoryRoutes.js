import { Router } from "express";
import {createAction, getActions} from "../controllers/actionHistoryController.js";

const router = Router()

router.post('/actions', (req, res, next) => {
    console.log('Received POST request at /actions with body:', JSON.stringify(req.body, null, 2));
    next();
  }, createAction);
  
  router.get('/actions', (req, res, next) => {
    console.log('Received GET request at /actions with query:', req.query);
    next();
  }, getActions);

export default router