import { Response } from 'express'

export const errorHandler = (res: Response) => {
  res.status(500).json({ ok: false, message: 'Unexpected error' })
  return Promise.resolve(false)
}

export default errorHandler
