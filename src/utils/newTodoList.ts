export default function getNewTodoList() {
    return {
        todos: [{
            id: 1, text: 'Do something', starred: false, startTime: "12:00", endTime: "15:00", colorIndex: 0
        }],
        nextId: 2
    };
}