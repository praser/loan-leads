import { Request, Response } from 'express'

import * as utils from './utils'
import { create } from './create'

const req = <Request>{}
const res = <Response>{}
res.status = jest.fn().mockReturnThis()
res.json = jest.fn().mockReturnThis()

jest.mock('./utils')

describe('handlers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    let sut: Boolean
    beforeEach(async () => {
      sut = await create(req, res)
    })

    it(' is expected to generate an id', () => {
      expect(utils.generateId).toBeCalled()
    })

    it('is expected to generate a message', () => {
      expect(utils.generateMessage).toBeCalledTimes(1)
    })

    it('is expected to post a job', () => {
      expect(utils.postJob).toBeCalled()
    })

    it('is expected to be truthy if job is posted', async () => {
      jest.spyOn(utils, 'postJob').mockResolvedValue(true)
      sut = await create(req, res)
      expect(sut).toBeTruthy()
    })

    it('is expected to be false if job is not posted', async () => {
      jest.spyOn(utils, 'postJob').mockResolvedValue(false)
      sut = await create(req, res)
      expect(sut).toBeFalsy()
    })

    describe('on error', () => {
      beforeEach(() => {
        jest.spyOn(utils, 'postJob').mockImplementation(() => {
          throw new Error()
        })
      })

      it('is expected to call error handler', async () => {
        await create(req, res)
        expect(utils.errorHandler).toBeCalledWith(res)
      })

      it('is expected to be falsy', async () => {
        sut = await create(req, res)
        expect(sut).toBeFalsy()
      })
    })
  })
})
