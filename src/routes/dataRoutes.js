import express from 'express'

import { DataController }
    from '../controllers/dataController.js'

const router = express.Router()

const controller =
    new DataController()

router.get(
    '/data',
    controller
        .getHistoricalData
        .bind(controller)
)

router.get(
    '/data/:id',
    controller
        .getDataById
        .bind(controller)
)

export default router