import express, { Request, Response, NextFunction, response } from "express"
import { v4 as uuidv4 } from "uuid"

import { ILead } from "@financiamento-bancario/core"

const app = express()
app.use(express.json())
const port = 3000
const leadQueue = "leads"

// TODO: Implement a queue to receive the messages
const addToQueue = (queue: string, message: any) => console.log(queue, message)

app.post("/leads", (req: Request, res: Response, next: NextFunction) => {
  const lead: ILead = {
    id: uuidv4(),
  }
  addToQueue(leadQueue, lead)
  res.status(201).json(lead)
})

app.put("/leads/:id", (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const lead: ILead = { id, ...req.body }
  addToQueue(leadQueue, lead)
  res.status(200).json(lead)
})

app.listen(port, () => {
  console.log(`Api is listening on port ${port}`)
})
