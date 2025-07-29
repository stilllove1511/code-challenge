import { NextFunction, Request, Response } from 'express'
import * as response from '../utils/response'
import { UserService } from '../services/userService'
import { CreateUserDto, UpdateUserDto } from '../types'

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getAllUsers()
            return response.ok(res, users)
        } catch (error) {
            next(error)
        }
    }

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return response.badRequest(res, 'Invalid user ID')

            const user = await this.userService.getUserById(id)
            if (!user) return response.notFound(res, 'User not found')

            return response.ok(res, user)
        } catch (error) {
            next(error)
        }
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, name }: CreateUserDto = req.body

            if (!email || !name)
                return response.badRequest(res, 'Email and name are required')

            // Check if user already exists
            const existingUser = await this.userService.getUserByEmail(email)
            if (existingUser)
                return response.conflict(res, 'User with this email already exists')

            const user = await this.userService.createUser({ email, name })
            return response.created(res, user)
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return response.badRequest(res, 'Invalid user ID')

            const { email, name }: UpdateUserDto = req.body

            // Check if user exists
            const existingUser = await this.userService.getUserById(id)
            if (!existingUser) return response.notFound(res, 'User not found')

            // Check if email is already taken by another user
            if (email && email !== existingUser.email) {
                const userWithEmail = await this.userService.getUserByEmail(
                    email
                )
                if (userWithEmail)
                    return response.conflict(res, 'Email is already taken')
            }

            const user = await this.userService.updateUser(id, { email, name })
            return response.ok(res, user)
        } catch (error) {
            next(error)
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return response.badRequest(res, 'Invalid user ID')

            // Check if user exists
            const existingUser = await this.userService.getUserById(id)
            if (!existingUser) return response.notFound(res, 'User not found')

            await this.userService.deleteUser(id)
            return response.ok(res, id)
        } catch (error) {
            next(error)
        }
    }
}
