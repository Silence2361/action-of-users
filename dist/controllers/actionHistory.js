import {ActionHistory} from '../models/actionhistory.js'

exports.createAction = async(req,res) => {
    try {
        const action = await ActionHistory.create(req.body)
        res.status(200).json(action)
    } catch (e) {
        return res.status(500).json({error: "Failed to create action"})
    }
}

exports.getActions = async(req,res) => {
  const {userId, page = 1, pageSize = 10} = req.query
  const offset = (page = 1) * pageSize
 
  try {
    const actions = await ActionHistory.findAndCountAll({
        where: userId ? {userId} : {},
        limit: pageSize,
        offset,
        order:[["timeStamp", "DESC"]]
    })

    res.status(200).json({
        total: actions.count,
        pages: Math.ceil(actions.count / pageSize),
        data: actions.rows
      })
  } catch (err) {
    res.status(500).json({err: "Failed to fetch actions"})
  }
}