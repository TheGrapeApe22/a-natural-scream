import { useState } from "react";
import StarFilled from "../assets/star-filled.png";
import StarEmpty from "../assets/star-empty.png";
import XIcon from "../assets/x-icon.png";

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
				className="icon-button"
				onClick={() => setStarred((s) => !s)}
			>
				<img src={starred ? StarFilled : StarEmpty} alt={starred ? "★" : "☆"} width="36px"/>
			</button>
			<input
				value={todo.text}
				onChange={(e) => onChange(todo.id, e.target.value)}
			/>
			<button className="icon-button">
                <img src={XIcon} alt="✕" width="36px" />
            </button>
		</div>
	);
}
