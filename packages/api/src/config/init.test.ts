import dotenv from 'dotenv-safe'
import { init } from './init'

jest.mock('dotenv-safe')

describe('config', () => {
  describe('init', () => {
    it('is expeted to call dotenv.config()', () => {
      init()
      expect(dotenv.config).toBeCalledTimes(1)
    })
  })
})
