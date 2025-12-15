import { useState } from "react";
import StarFilled from "../assets/star-filled.png";
import StarEmpty from "../assets/star-empty.png";
import XIcon from "../assets/x-icon.png";

export type Todo = {
	id: number;
	text: string;
	starred: boolean;
};

type TodoItemProps = {
	todo: Todo;
	onChange: (id: number, newText: string) => void;
	onDelete: (id: number) => void;
	onToggleStar: (id: number) => void;
};

export default function TodoItem({ todo, onChange, onDelete, onToggleStar }: TodoItemProps) {
	return (
		<div className="todo-item">
			<button
				className="icon-button"
				onClick={() => onToggleStar(todo.id)}
			>
				<img src={todo.starred ? StarFilled : StarEmpty} alt={todo.starred ? "★" : "☆"} width="36px"/>
			</button>
			<input
				value={todo.text}
				onChange={(e) => onChange(todo.id, e.target.value)}
			/>
			<button className="icon-button" onClick={() => onDelete(todo.id)}>
				<img src={XIcon} alt="✕" width="36px" />
			</button>
		</div>
	);
}
