/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
class Users {
    // Para makuha ang full info ng user base sa session userId
    public async findById(id: string): Promise<any | null> {
        return null
    }

    // Para sa registration logic
    public async create(data: any): Promise<any | null> {
        return null
    }
}
export const UsersService = new Users()
