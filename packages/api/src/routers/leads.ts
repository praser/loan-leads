import { Router } from "express"
import * as hander from "../handers/leads"
const router = Router()

router.post("/", hander.create)
router.put("/:id", hander.update)

export default router
