import { useRef, useState } from "react";
import TodoItem, { Todo } from "./TodoItem";
import "./todo.css";
import PlusIcon from "../assets/plus-icon.png";

export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: "Buy milk" },
        { id: 2, text: "Read a book" },
    ]);

    const nextId = useRef(3);

    const handleChange = (id: number, newText: string) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    };

    const addTodo = () => {
        setTodos((prev) => [...prev, { id: nextId.current++, text: "" }]);
    };

    return (
        <div className="todo-page">
            <div className="todo-list">
                {todos.map((t) => (
                    <TodoItem key={t.id} todo={t} onChange={handleChange} />
                ))}

                <div className="todo-item">
                    <button onClick={addTodo} className="icon-button">
                        <img src={PlusIcon} alt="+" width="60px" />
                    </button>
                </div>
            </div>
        </div>
    );
}