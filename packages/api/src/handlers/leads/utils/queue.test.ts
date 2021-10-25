import { queue } from './queue'

jest.mock('@loan-leads/utils')

describe('queue', () => {
  it('expects queue to be "leads"', () => {
    expect(queue).toBe('leads')
  })
});