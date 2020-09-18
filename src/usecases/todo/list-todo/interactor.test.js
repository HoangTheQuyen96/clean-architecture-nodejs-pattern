/** 
* File path: /usecases/todo/list-todo/interactor.test.js
*/
const { Todo } = require("../../../entities/todo");
const { listTodo } = require("./interactor");

let mockError;
let mockInject;
let mockListTodo;

beforeEach(() => {
    mockError = new Error("Oops");
    mockInject = {
        infra: {
            dataGateway: {
                listTodo: jest.fn(),
            },
        },
    };
    mockListTodo = [
        Todo({
            title: "Check-in at company",
            status: "done",
            deleted: false,
            created_at: 1600331128848,
            updated_at: 1600331128848,
            _id: '001'
        }),
        Todo({
            title: "Check-out at company",
            status: "undone",
            deleted: false,
            created_at: 1600331128850,
            updated_at: 1600331128850,
            _id: '0002'
        }),
        Todo({
            title: "Check-in at the coffee",
            status: "done",
            deleted: false,
            created_at: 1600331128852,
            updated_at: 1600331128852,
            _id: '003'
        })
    ]
});

describe("Testing list todo use case interactor", () => {
    test("Should throw an error if data gateway list todo throwing an error", async () => {
        mockInject.infra.dataGateway.listTodo.mockRejectedValue(mockError);
        const interactor = listTodo(mockInject)

        let actualError;
        try {
            await interactor();
        } catch (error) {
            actualError = error;
        }

        const expectedError = new Error("Oops");
        expect(actualError.message).toBe(expectedError.message);
        expect(actualError.code).toBe(expectedError.code);
    });
})

test("Should return list todo object", async () => {
    mockInject.infra.dataGateway.listTodo.mockResolvedValue(mockListTodo);
    const interactor = listTodo(mockInject);

    const result = await interactor();

    expect(result).toEqual(mockListTodo);
});