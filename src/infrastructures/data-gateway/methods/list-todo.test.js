/** 
* File path: /infrastructure/data-gateway/methods/create-todo.test.js
*/
const { Todo } = require("../../../entities/todo");
const { listTodo } = require("./list-todo");

beforeEach(() => {
    mockError = new Error("Oops");
    mockInject = {
        mongoReplica: {
            collection: jest.fn()
        }
    };
    mockListTodo = [{
        title: "Check-in at company",
        status: "done",
        deleted: false,
        created_at: 1600331128848,
        id: '001'
    },
    {
        title: "Check-out at company",
        status: "undone",
        deleted: false,
        created_at: 1600331128850,
        id: '0002'
    },
    {
        title: "Check-in at the coffee",
        status: "done",
        deleted: false,
        created_at: 1600331128852,
        id: '003'
    }]
});

describe("Testing create todo method", () => {
    test("Should throw an error if mongo primary is not work", async () => {
        mockInject.mongoReplica.collection = jest.fn().mockReturnValue({
            find: jest.fn().mockImplementation(() => ({
                toArray: jest.fn().mockRejectedValue(mockError)
            }))
        })

        const bindFn = listTodo(mockInject)

        let actualError;
        try {
            await bindFn();
        } catch (error) {
            actualError = error;
        }

        const expectedError = new Error("Oops");
        expect(actualError.message).toBe(expectedError.message);
        expect(actualError.code).toBe(expectedError.code);
    });
    test("Should return list todo record", async () => {
        const expectedResult = mockListTodo.map(todo => Todo(todo))

        mockInject.mongoReplica.collection = jest.fn().mockReturnValue({
            find: jest.fn().mockImplementation(() => ({
                toArray: jest.fn().mockResolvedValue(
                    mockListTodo.map(todo => ({
                        ...todo,
                        _id: todo.id,
                        updated_at: todo.created_at
                    }))
                )
            }))
        })

        const bindFn = listTodo(mockInject)
        const result = await bindFn();
        expect(result).toEqual(expectedResult);
    });
});