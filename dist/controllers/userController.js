var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from '../models/index.js';
import axios from 'axios';
const sendActionHistory = (userId, action) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios.post(`${process.env.HISTORY_SERVICE_URL}/api/actions`, {
            userId,
            action,
            timestamp: new Date(),
        });
    }
    catch (error) {
        console.error('Failed to send action to history', error);
    }
});
export const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('createUser called with body:', JSON.stringify(req.body, null, 2));
    try {
        console.log('User:', User);
        const user = yield User.create(req.body);
        console.log("User created: ", user);
        yield sendActionHistory(user.id, 'create');
        res.status(201).json(user);
    }
    catch (err) {
        console.error('Failed to create user:', err);
        next(err);
    }
});
export const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        yield user.update(req.body);
        yield sendActionHistory(user.id, 'update');
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ err: 'Failed to update user' });
    }
});
export const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.findAll();
        res.status(200).json(users);
    }
    catch (e) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
