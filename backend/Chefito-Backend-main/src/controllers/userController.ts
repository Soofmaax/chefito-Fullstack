import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { ApiResponse, ProfileUpdateRequest } from '../types/api';
import { AuthenticatedUser } from '../types/user';
import { logger } from '../config/logger';

interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

export class UserController {
  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not authenticated',
        };
        return res.status(401).json(response);
      }

      logger.info('Fetching user profile', { userId: req.user.id });

      const profile = await userService.getUserProfile(req.user.id);
      const stats = await userService.getUserStats(req.user.id);

      logger.info('User profile fetched successfully', { userId: req.user.id });

      const response: ApiResponse = {
        success: true,
        data: {
          user: {
            id: req.user.id,
            email: req.user.email,
          },
          profile,
          stats,
        },
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not authenticated',
        };
        return res.status(401).json(response);
      }

      const updates: ProfileUpdateRequest = req.body;
      
      logger.info('Updating user profile', { 
        userId: req.user.id,
        updates: Object.keys(updates) 
      });

      const updatedProfile = await userService.updateUserProfile(req.user.id, updates);

      logger.info('User profile updated successfully', { userId: req.user.id });

      const response: ApiResponse = {
        success: true,
        data: updatedProfile,
        message: 'Profile updated successfully',
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getUserStats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not authenticated',
        };
        return res.status(401).json(response);
      }

      logger.info('Fetching user stats', { userId: req.user.id });

      const stats = await userService.getUserStats(req.user.id);

      logger.info('User stats fetched successfully', { userId: req.user.id });

      const response: ApiResponse = {
        success: true,
        data: stats,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();