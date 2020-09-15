const customError = require('./custom-error')

test('Can extends and keep the stack trace from original error', () => {
  const originalError = new Error('ABC')
  originalError.stack = ['custom trace']
  const error = customError('abc', '123', originalError)

  expect(error).toBeTruthy()
  expect(error.message).toBe('123')
  expect(error.stack.includes('custom trace')).toBe(true)
})

test('Can extends but non keep the stack if originalError is not instance of Error', () => {
  const originalError = 'ABC'
  originalError.stack = ['custom trace']
  const error = customError('abc', '123', originalError)

  expect(error).toBeTruthy()
  expect(error.message).toBe('123')
  expect(error.stack.includes('custom trace')).not.toBe(true)
})
