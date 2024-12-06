// /src/types/index.ts

// Todo-related types
export interface TodoIn {
    title: string;
    description?: string;
    completed?: boolean;
}

export interface TodoOut extends TodoIn {
    id: string;
    createdAt: string;
    updatedAt: string;
}

// User-related types
export interface UserIn {
    email: string;
    password: string;
}

export interface UserOut {
    id: string;
    email: string;
    createdAt: string;
}
