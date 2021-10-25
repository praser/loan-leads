import { Request, Response } from 'express'
import { ILead, EnumMQActions, IMQMessage } from '@loan-leads/core'
import { errorHandler, generateId, generateMessage, postJob } from './utils'

export const create = (req: Request, res: Response): Promise<Boolean> => {
  try {
    const lead: ILead = { id: generateId() }
    const message: IMQMessage<ILead> = generateMessage(
      EnumMQActions.CREATE,
      lead,
    )
    return postJob(message, res)
  } catch {
    return errorHandler(res)
  }
}

export default create

// export const update = async (req: Request, res: Response): Promise<Boolean> => {
//   try {
//     const { id } = req.params
//     const lead: ILead = { id, ...req.body }
//     const message: IMQMessage<ILead> = generateMessage(EnumMQActions.UPDATE, lead)
//     const published = await publish(queue, message)
//     published
//       ? res.status(202).json({ok: true, data: [ lead ]})
//         : res.status(500).json({ok: false, message: 'Error on queueing the job'})

//     return Promise.resolve(published)
//   } catch {
//     res.status(500).json({ok: false, message: 'Unexpected error'})
//     return Promise.resolve(false)
//   }
// }
