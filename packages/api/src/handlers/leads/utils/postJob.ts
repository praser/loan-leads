import { ILead, IMQMessage } from '@loan-leads/core'
import { publish } from '@loan-leads/utils'
import { Response } from 'express'
import queue from './queue'

export const postJob = async (
  message: IMQMessage<ILead>,
  res: Response,
): Promise<Boolean> => {
  const published = await publish(queue, message)
  published
    ? res.status(202).json({ ok: true, data: [message.content] })
    : res.status(500).json({ ok: false, message: 'Error on queueing the job' })

  return Promise.resolve(published)
}

export default postJob
