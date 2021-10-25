import { Request, Response } from 'express'
import faker from 'faker'
import { EnumMQActions, ILead, IMQMessage } from '@loan-leads/core'
import * as utils from '@loan-leads/utils'

import generateMessage from './generateMessage'
import postJob from './postJob'

jest.mock('@loan-leads/utils')

describe('postJob', () => {
  let req: Request, res: Response
  let message: IMQMessage<ILead>, action: EnumMQActions, content: ILead

  beforeEach(() => {
    req = <Request>{}
    res = <Response>{}
    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
    action = EnumMQActions.CREATE
    content = { id: faker.datatype.uuid() }
    message = generateMessage(action, content)
  })

  describe('when job is successfully published', () => {
    let sut: Boolean
    beforeEach(async () => {
      jest.spyOn(utils, 'publish').mockResolvedValue(true)
      sut = await postJob(message, res)
    })

    it('is expected to be truthy', async () => {
      expect(sut).toBeTruthy()
    })

    it('is expected to call res.status with 202', () => {
      expect(res.status).toBeCalledWith(202)
    })

    it('is expected to call res.json once', () => {
      expect(res.json).toBeCalled()
    })
  })

  describe('when job fails to publish', () => {
    let sut: Boolean
    beforeEach(async () => {
      jest.spyOn(utils, 'publish').mockResolvedValue(false)
      sut = await postJob(message, res)
    })

    it('is expected to be falsy', async () => {
      expect(sut).toBeFalsy()
    })

    it('is expected to call res.status with 500', () => {
      expect(res.status).toBeCalledWith(500)
    })

    it('is expected to call res.json once', () => {
      expect(res.json).toBeCalledWith({
        ok: false,
        message: 'Error on queueing the job',
      })
    })
  })
})
