import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { CreateUserDto, UpdateUserDto } from '../types';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching users'
      });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID'
        });
      }

      const user = await this.userService.getUserById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching user'
      });
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const { email, name }: CreateUserDto = req.body;

      if (!email || !name) {
        return res.status(400).json({
          success: false,
          message: 'Email and name are required'
        });
      }

      // Check if user already exists
      const existingUser = await this.userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      const user = await this.userService.createUser({ email, name });
      res.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating user'
      });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID'
        });
      }

      const { email, name }: UpdateUserDto = req.body;

      // Check if user exists
      const existingUser = await this.userService.getUserById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if email is already taken by another user
      if (email && email !== existingUser.email) {
        const userWithEmail = await this.userService.getUserByEmail(email);
        if (userWithEmail) {
          return res.status(409).json({
            success: false,
            message: 'Email is already taken'
          });
        }
      }

      const user = await this.userService.updateUser(id, { email, name });
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating user'
      });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID'
        });
      }

      // Check if user exists
      const existingUser = await this.userService.getUserById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      await this.userService.deleteUser(id);
      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting user'
      });
    }
  };
}
