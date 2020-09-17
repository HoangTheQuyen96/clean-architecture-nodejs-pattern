/** 
* File path: /entities/todo.test.js
*/
const { Todo } = require("./todo");

describe("Testing entities/todo", () => {
    test("Should init a todo object", () => {
        const mockInput = { id: "0001", title: "Check-in at company", status: "done", created_at: 1600314980933 };
        const instance = Todo(mockInput);
        expect(instance).toBeTruthy();
        expect(instance.id).toBe(mockInput.id);
        expect(instance.title).toBe(mockInput.title);
        expect(instance.status).toBe(mockInput.status);
        expect(instance.created_at).toBe(new Date(mockInput.created_at).toISOString());
    });
});