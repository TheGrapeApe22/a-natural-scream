import StarFilled from "../assets/ui/star-filled.png";
import StarEmpty from "../assets/ui/star-empty.png";
import XIcon from "../assets/ui/x-icon.png";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { Popover } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { colors } from "../utils/colors";
import { dateToTimeString, timeStringToDate, formatTimeAMPM } from "../utils/dates";
import { useState } from "react";
import ColorPicker from "./ColorPicker";

export type Todo = {
	id: number;
	text: string;
	starred: boolean;
	startTime: string | null;
	endTime: string | null;
	colorIndex: number;
};

type TodoItemProps = {
	todo: Todo;
	onChange: (next: Todo) => void;
	onDelete: (id: number) => void;
	autoFocus?: boolean;
	minimize?: boolean;
};

function textAreaAdjust(element : HTMLTextAreaElement) {
	element.style.height = "1px";
	element.style.height = (element.scrollHeight)+"px";
}

export default function TodoItem({ todo, onChange, onDelete, autoFocus, minimize }: TodoItemProps) {
	const [colorAnchor, setColorAnchor] = useState<HTMLElement | null>(null);
	const colorOpen = Boolean(colorAnchor);
	const [timeAnchor, setTimeAnchor] = useState<HTMLElement | null>(null);
	const timeOpen = Boolean(timeAnchor);

	return (
		<div className="todo-item">
			<button
				className="icon-button"
				onClick={() => onChange({ ...todo, starred: !todo.starred })}
			>
				<img
					src={todo.starred ? StarFilled : StarEmpty}
					alt={todo.starred ? "★" : "☆"}
					/>
			</button>
			
			{!minimize && <>
				<button
					className="color-button"
					style={{ backgroundColor: colors[todo.colorIndex] }}
					onClick={(e) => setColorAnchor(e.currentTarget)}
				/>
				<ColorPicker
					anchorEl={colorAnchor}
					open={colorOpen}
					onClose={() => setColorAnchor(null)}
					value={todo.colorIndex}
					onChange={(idx) => onChange({ ...todo, colorIndex: idx })}
				/>
			</>}
			
			<textarea className="todo-input"
				value={todo.text}
				onChange={(e) => {onChange({ ...todo, text: e.target.value }); textAreaAdjust(e.currentTarget);}}
				autoFocus={autoFocus}
			/>
			{!minimize && <div className="time-section">
				<span className="time-text">
					{formatTimeAMPM(todo.startTime)} – {formatTimeAMPM(todo.endTime)}
				</span>
				<button
					className="icon-button"
					onClick={(e) => setTimeAnchor(e.currentTarget)}
				>
					<AccessTimeIcon fontSize="small" className="clock-icon" />
				</button>
				<Popover
					open={timeOpen}
					anchorEl={timeAnchor}
					onClose={() => setTimeAnchor(null)}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					transformOrigin={{ vertical: 'top', horizontal: 'left' }}
				>
					<div style={{ display: 'flex', gap: 12, padding: 12 }}>
						<MobileTimePicker
							label="Start"
							value={timeStringToDate(todo.startTime)}
							onChange={(value) =>
								onChange({ ...todo, startTime: dateToTimeString(value) })
							}
						/>
						<MobileTimePicker
							label="End"
							value={timeStringToDate(todo.endTime)}
							onChange={(value) =>
								onChange({ ...todo, endTime: dateToTimeString(value) })
							}
						/>
					</div>
				</Popover>
			</div>}
			<button className="icon-button" onClick={() => onDelete(todo.id)}>
				<img src={XIcon} alt="✕" />
			</button>
		</div>
	);
}
