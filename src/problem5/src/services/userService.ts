import { prisma } from '../config/database'
import { CreateUserDto, UpdateUserDto } from '../types'

export class UserService {
    async getAllUsers() {
        return await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
        })
    }

    async getUserById(id: number) {
        return await prisma.user.findUnique({
            where: { id },
        })
    }

    async createUser(data: CreateUserDto) {
        return await prisma.user.create({
            data,
        })
    }

    async updateUser(id: number, data: UpdateUserDto) {
        return await prisma.user.update({
            where: { id },
            data,
        })
    }

    async deleteUser(id: number) {
        return await prisma.user.delete({
            where: { id },
        })
    }

    async getUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email },
        })
    }
}
