import { generateId } from './generateId'

jest.mock('@loan-leads/utils')


describe('generateId', () => {
  it('is expected to generate a valid uuidv4', async () => {
    expect(generateId()).toMatch(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
  })
})