import { Router } from 'express'
import * as hander from '../handlers/leads'

export const router = Router()

router.post('/', hander.create)
router.put('/:id', hander.update)

export default router
