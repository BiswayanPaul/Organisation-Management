export interface IUser {
    name: string; // User's name
    email: string; // User's email address
    password: string; // User's hashed password
    organisations: {
        organisation: string; // Reference to an organisation
        role: "ADMIN" | "EMPLOYEE"; // Role of the user in the organisation
    }[];
    todo: {
        todo:string; // Reference to a todo item
        deadline: Date; // Deadline for the todo
    }[];
    createdAt: Date; // Timestamp when the user was created
    updatedAt: Date; // Timestamp when the user was last updated
}