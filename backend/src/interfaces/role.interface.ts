export interface RoleInterface {
    title: string,
    id: number,
    userRole: {
        roleId: number,
        userId: number
    }
}