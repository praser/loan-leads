import { Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from "uuid"
import { ILead } from "@financiamento-bancario/core"
import { publish } from "../clients/mq"

const queue = "leads"

export const create = async (req: Request, res: Response) => {
  const lead: ILead = { id: uuidv4() }
  ;(await publish(queue, lead))
    ? res.status(201).json(lead)
    : res.status(500).json({ message: "Error on lead creation" })
}

export const update = async (req: Request, res: Response) => {
  const { id } = req.params
  const lead: ILead = { id, ...req.body }
  ;(await publish(queue, lead))
    ? res.status(200).json(lead)
    : res.status(500).json({ message: "Error on lead update" })
}
