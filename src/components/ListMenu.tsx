import React from "react";
import { Menu, MenuItem, IconButton, Tooltip } from "@mui/material";

type ListMenuProps = {
	isDefault: boolean;
	currentName: string;
	onRename: (nextName: string) => void;
	onDelete: () => void;
	className?: string;
};

export default function ListMenu({ isDefault, currentName, onRename, onDelete, className }: ListMenuProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => setAnchorEl(null);

	const handleRename = () => {
		handleClose();
		if (isDefault) return;
		const next = window.prompt("Rename list", currentName);
		const trimmed = next?.trim();
		if (trimmed) {
			onRename(trimmed);
		}
	};

	const handleDelete = () => {
		handleClose();
		if (isDefault) return;
		const ok = window.confirm(`Delete list "${currentName}"? This can't be undone.`);
		if (ok) onDelete();
	};

	return (
		<div className={className}>
			<Tooltip style={{ color: 'var(--text-color)' }} title="List options">
				<IconButton
					onClick={handleOpen}
					size="small"
				>
					{/* Using a simple glyph to avoid extra icon deps */}
					<span style={{ fontSize: 20, lineHeight: 1 }}>⋮</span>
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<MenuItem className="menu-item" disabled={isDefault} onClick={handleRename}>Rename list</MenuItem>
				<MenuItem className="menu-item" disabled={isDefault} onClick={handleDelete}>Delete list</MenuItem>
			</Menu>
		</div>
	);
}
