import { Request, Response } from 'express'
import { ILead, EnumMQActions, IMQMessage } from '@loan-leads/core'
import { errorHandler, generateId, generateMessage, postJob } from './utils'

export const update = (req: Request, res: Response): Promise<Boolean> => {
  try {
    const { id } = req.params
    const lead: ILead = { id, ...req.body }
    const message: IMQMessage<ILead> = generateMessage(
      EnumMQActions.UPDATE,
      lead,
    )
    return postJob(message, res)
  } catch {
    return errorHandler(res)
  }
}

export default update
