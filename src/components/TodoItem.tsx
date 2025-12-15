import { useState } from "react";
import StarFilled from "../assets/star-filled.png";
import StarEmpty from "../assets/star-empty.png";
import XIcon from "../assets/x-icon.png";
import PlusIcon from "../assets/plus-icon.png";

export type Todo = {
	id: number;
	text: string;
};

type TodoItemProps = {
	todo: Todo;
	onChange: (id: number, newText: string) => void;
};

export default function TodoItem({ todo, onChange }: TodoItemProps) {
	const [starred, setStarred] = useState(false);
	return (
		<div className="todo-item">
			<button
				className="star-button button"
				onClick={() => setStarred((s) => !s)}
			>
				<img className="star-icon" src={starred ? StarFilled : StarEmpty} alt={starred ? "★" : "☆"} width="36px"/>
			</button>
			<input
				value={todo.text}
				onChange={(e) => onChange(todo.id, e.target.value)}
			/>
			<button className="x-button button">
                <img src={XIcon} className="star-icon" alt="✕" width="36px" />
            </button>
		</div>
	);
}
