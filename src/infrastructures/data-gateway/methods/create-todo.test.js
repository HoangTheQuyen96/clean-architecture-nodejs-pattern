/** 
* File path: /infrastructure/data-gateway/methods/create-todo.test.js
*/
const { Todo } = require("../../../entities/todo");
const { createTodo } = require("./create-todo");

beforeEach(() => {
  mockError = new Error("Oops");
  mockInject = {
    mongoPrimary: jest.fn().mockImplementation(() => ({
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn().mockResolvedValue({
          ops: [
            {
              title: "Check-out at company",
              status: "undone",
              deleted: false,
              created_at: 1600331128847,
              updated_at: 1600331128847,
              _id: '0002'
            }
          ]
        })
      })
    }))
  };
  mockInput = {
    title: "Check-out at company",
    status: "undone",
  };
  mockTodo = {
    id: "0002",
    title: "Check-out at company",
    status: "undone",
    created_at: 1600331128847,
  };
});

describe("Testing create todo method", () => {
  test("Should throw an error if mongo primary is not work", async () => {
    mockInject.mongoPrimary.mockImplementation(() => ({
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn().mockRejectedValue(mockError)
      })
    }))

    const bindFn = createTodo(mockInject)

    let actualError;
    try {
      await bindFn(mockInput);
    } catch (error) {
      actualError = error;
    }

    const expectedError = new Error("Oops");
    expect(actualError.message).toBe(expectedError.message);
    expect(actualError.code).toBe(expectedError.code);
  });
  test("Should return a todo record", async () => {
    const expectedResult = Todo(mockTodo);

    const bindFn = createTodo(mockInject)
    const result = await bindFn(mockInput);

    expect(result).toEqual(expectedResult);
  });
});