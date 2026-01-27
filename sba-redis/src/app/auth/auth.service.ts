class Auth {
    private users: Array<{
        id: string
        email: string
        username?: string
        password: string
    }> = []

    public async register() {
        return null
    }

    public async login() {
        return null
    }

    public async forgotPassword() {
        return { message: 'Password reset link sent' }
    }
}
export const AuthService = new Auth()
