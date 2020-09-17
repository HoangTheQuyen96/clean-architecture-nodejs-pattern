/** 
* File path: /usecases/todo/create-todo/interactor.test.js
*/
const { Todo } = require("../../../entities/todo");
const { createTodo } = require("./interactor");

let mockError;
let mockInject;
let mockInput;
let mockTodo;

beforeEach(() => {
    mockError = new Error("Oops");
    mockInject = {
        infra: {
            dataGateway: {
                createTodo: jest.fn(),
            },
        },
    };
    mockInput = {
        title: "Check-out at company",
        status: "undone",
    };
    mockTodo = Todo({
        ...mockInput,
        deleted: false,
        created_at: 1600331128847,
        updated_at: 1600331128847,
        _id: '0002'
    });
});

describe("Testing create todo use case interactor", () => {
    test("Should throw an error if data gateway create todo throwing an error", async () => {
        mockInject.infra.dataGateway.createTodo.mockRejectedValue(mockError);
        const interactor = createTodo(mockInject)

        let actualError;
        try {
            await interactor(mockInput);
        } catch (error) {
            actualError = error;
        }

        const expectedError = new Error("Oops");
        expect(actualError.message).toBe(expectedError.message);
        expect(actualError.code).toBe(expectedError.code);
    });
})

test("Should return a todo object", async () => {
    mockInject.infra.dataGateway.createTodo.mockResolvedValue(mockTodo);
    const interactor = createTodo(mockInject);

    const result = await interactor(mockInput);

    expect(result).toEqual(mockTodo);
});