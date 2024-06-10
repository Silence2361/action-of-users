import { Request, Response, NextFunction} from 'express';
import { User } from '../models/index.js';
import axios from 'axios';

const sendActionHistory = async (userId: number, action: string) => {
  try {
    await axios.post(`${process.env.HISTORY_SERVICE_URL}/api/actions`, {
      userId,
      action,
      timestamp: new Date(),
    })
  } catch (error) {
    console.error('Failed to send action to history', error)
  }
}


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log('createUser called with body:', JSON.stringify(req.body, null, 2))
    try {
      console.log('User:', User);
      const user = await User.create(req.body)
      console.log("User created: ",user)
      await sendActionHistory(user.id, 'create')
      res.status(201).json(user)
    } catch (err) {
      console.error('Failed to create user:', err);
      next(err)
    }
  }

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    await user.update(req.body)
    await sendActionHistory(user.id, 'update')
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ err: 'Failed to update user' })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}