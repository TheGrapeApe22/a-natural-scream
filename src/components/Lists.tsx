import { useMemo, useState } from "react";
import "./lists.css";

type ListsProps = {
	onSelectList?: (name: string) => void;
	onCreateList?: (name: string) => void;
	className?: string;
};

export default function Lists({ onSelectList, onCreateList, className }: ListsProps = {}) {
	const [lists, setLists] = useState<string[]>(["List1", "New"]);
	const [selected, setSelected] = useState<string>("List1");

	const nextListName = useMemo(() => {
		const base = "List";
		const existingNumbers = lists
			.filter((l) => l.startsWith(base) && l !== "New")
			.map((l) => Number(l.replace(base, "")))
			.filter((n) => !Number.isNaN(n));
		const max = existingNumbers.length ? Math.max(...existingNumbers) : 0;
		return `${base}${max + 1}`;
	}, [lists]);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		if (value === "New") {
			const name = nextListName;
			setLists((prev) => {
				const withoutNew = prev.filter((p) => p !== "New");
				return [...withoutNew, name, "New"];
			});
			setSelected(name);
			onCreateList?.(name);
			onSelectList?.(name);
			return;
		}
		setSelected(value);
		onSelectList?.(value);
	};

	return (
		<div className={["lists-dropdown", className].filter(Boolean).join(" ")}>
			<label className="lists-label" htmlFor="lists-select">Lists</label>
			<select id="lists-select" className="lists-select" value={selected} onChange={handleChange}>
				{lists.map((name) => (
					<option key={name} value={name}>
						{name}
					</option>
				))}
			</select>
		</div>
	);
}

