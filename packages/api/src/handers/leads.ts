import { Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from "uuid"
import { ILead } from "@financiamento-bancario/core"

const queue = "lead"
const addToQueue = (queue: string, message: ILead) => {
  //TODO: Implement this method in a client
  console.log(queue, message)
}

export const create = (req: Request, res: Response, next: NextFunction) => {
  const lead: ILead = {
    id: uuidv4(),
  }
  addToQueue(queue, lead)
  res.status(201).json(lead)
}

export const update = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const lead: ILead = { id, ...req.body }
  addToQueue(queue, lead)
  res.status(200).json(lead)
}
