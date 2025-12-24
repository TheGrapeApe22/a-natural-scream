import type { Todo } from "../components/TodoItem";

// Storage key used in localStorage for all todo lists.
export const TODO_STORAGE_KEY = "time-app.todoLists" as const;
// Schema version for the persisted todo lists state.
export const TODO_STORAGE_VERSION = 1 as const;

// Bucket of todos and the next id counter for a single list.
export type ListBucket = {
    todos: Todo[];
    nextId: number;
};

// Root persisted state containing all lists and the currently selected list.
export type TodoListsState = {
    version: number;
    selectedList: string;
    lists: Record<string, ListBucket>;
};

// Returns the default initial state for todo lists.
export function getDefaultTodoLists(): TodoListsState {
    return {
        version: TODO_STORAGE_VERSION,
        selectedList: "List1",
        lists: {
            List1: { todos: [], nextId: 1 },
        },
    };
}

// Loads the todo lists state from localStorage, or undefined if missing/invalid.
export function loadTodoLists(): TodoListsState | undefined {
    if (typeof window === "undefined" || !window.localStorage) return undefined;
    try {
        const raw = window.localStorage.getItem(TODO_STORAGE_KEY);
        if (!raw) return undefined;
        const parsed = JSON.parse(raw);
        return validateTodoLists(parsed) ? parsed : undefined;
    } catch {
        return undefined;
    }
}

// Saves the provided todo lists state to localStorage (silently ignores errors).
export function saveTodoLists(state: TodoListsState): void {
    if (typeof window === "undefined" || !window.localStorage) return;
    try {
        const payload = JSON.stringify(state);
        window.localStorage.setItem(TODO_STORAGE_KEY, payload);
    } catch {
        // Swallow write errors; caller may choose to handle/report.
    }
}

// Validates at runtime that a value matches the TodoListsState shape.
export function validateTodoLists(obj: unknown): obj is TodoListsState {
    if (!obj || typeof obj !== "object") return false;
    const anyObj = obj as Record<string, unknown>;
    if (typeof anyObj.version !== "number") return false;
    if (typeof anyObj.selectedList !== "string") return false;
    const lists = anyObj.lists as unknown;
    if (!lists || typeof lists !== "object") return false;

    const buckets = lists as Record<string, unknown>;
    for (const key of Object.keys(buckets)) {
        const bucket = buckets[key] as Record<string, unknown>;
        if (!bucket || typeof bucket !== "object") return false;
        if (!Array.isArray(bucket.todos)) return false;
        if (typeof bucket.nextId !== "number") return false;
        // Minimal check for todos array elements shape
        for (const t of bucket.todos as unknown[]) {
            const todo = t as Record<string, unknown>;
            if (typeof todo !== "object") return false;
            if (typeof todo.id !== "number") return false;
            if (typeof todo.text !== "string") return false;
            if (typeof todo.starred !== "boolean") return false;
        }
    }
    return true;
}
