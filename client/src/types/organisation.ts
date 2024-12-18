export interface IOrganisation {
    name: string; // Name of the organisation
    description?: string; // Optional description of the organisation
    createdBy: string; // User ID of the admin who created the organisation
    members: {
        userId: string; // User ID of the member
        role: "ADMIN" | "EMPLOYEE"; // Role of the member in the organisation
    }[];
    createdAt: Date;
    updatedAt: Date;
}
