import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { ILead } from '@loan-leads/core'
import { EnumMQActions, IMQMessage, publish } from '@loan-leads/utils'

const queue = 'leads'

export const create = async (req: Request, res: Response): Promise<void> => {
  const lead: ILead = { id: uuidv4() }
  const message: IMQMessage<ILead> = {
    action: EnumMQActions.CREATE,
    content: lead,
  }

  ;(await publish(queue, message))
    ? res.status(201).json(lead)
    : res.status(500).json({ message: 'Error on lead creation' })
}

export const update = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const lead: ILead = { id, ...req.body }
  const message: IMQMessage<ILead> = {
    action: EnumMQActions.UPDATE,
    content: lead,
  }

  ;(await publish(queue, message))
    ? res.status(200).json(lead)
    : res.status(500).json({ message: 'Error on lead update' })
}
