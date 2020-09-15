const handleRouteNotFound = require('./handle-route-notfound')

test('notFound', async () => {
  const req = jest.fn()

  const res = {
    status: jest.fn().mockImplementation((code) => ({
      json: jest.fn().mockResolvedValue({})
    }))
  }

  const next = jest.fn()

  await handleRouteNotFound(req, res, next)

  expect(next).toHaveBeenCalled()
})
