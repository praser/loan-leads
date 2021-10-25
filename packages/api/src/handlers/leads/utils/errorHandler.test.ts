import { Response } from 'express'
import * as utils from '@loan-leads/utils'

import errorHandler from './errorHandler'

jest.mock('@loan-leads/utils')

describe('errorHandler', () => {
  let sut: Boolean, res: Response
  beforeEach(async () => {
    jest.spyOn(utils, 'publish').mockRejectedValue('Service unavailable')
    res = <Response>{}
    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
    sut = await errorHandler(res)
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
      message: 'Unexpected error',
    })
  })
})
