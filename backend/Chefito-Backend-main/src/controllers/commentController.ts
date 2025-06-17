import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { ApiResponse } from '../types/api';
import { AuthenticatedUser } from '../types/user';
import { logger } from '../config/logger';

interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

export class CommentController {
  async getComments(req: Request, res: Response, next: NextFunction) {
    try {
      const { recipeId } = req.params;
      
      logger.info('Fetching comments', { recipeId });
      
      const { data: comments, error } = await supabaseAdmin
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          user_id,
          profiles!comments_user_id_fkey (
            full_name,
            avatar_url
          )
        `)
        .eq('recipe_id', recipeId)
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching comments', { error, recipeId });
        throw error;
      }

      logger.info('Comments fetched successfully', { 
        recipeId, 
        count: comments?.length || 0 
      });

      const response: ApiResponse = {
        success: true,
        data: comments,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async createComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'Authentication required',
        };
        return res.status(401).json(response);
      }

      const { recipeId } = req.params;
      const { content } = req.body;

      logger.info('Creating comment', { 
        recipeId, 
        userId: req.user.id,
        contentLength: content.length 
      });

      const { data: comment, error } = await supabaseAdmin
        .from('comments')
        .insert({
          recipe_id: recipeId,
          user_id: req.user.id,
          content: content.trim(),
          approved: false, // Comments need approval
        })
        .select()
        .single();

      if (error) {
        logger.error('Error creating comment', { error, recipeId, userId: req.user.id });
        throw error;
      }

      logger.info('Comment created successfully', { 
        commentId: comment.id,
        recipeId,
        userId: req.user.id 
      });

      const response: ApiResponse = {
        success: true,
        data: comment,
        message: 'Comment submitted for approval',
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'Authentication required',
        };
        return res.status(401).json(response);
      }

      const { commentId } = req.params;
      const { content } = req.body;

      logger.info('Updating comment', { 
        commentId, 
        userId: req.user.id,
        contentLength: content.length 
      });

      const { data: comment, error } = await supabaseAdmin
        .from('comments')
        .update({
          content: content.trim(),
          approved: false, // Reset approval status
        })
        .eq('id', commentId)
        .eq('user_id', req.user.id)
        .select()
        .single();

      if (error) {
        logger.error('Error updating comment', { error, commentId, userId: req.user.id });
        throw error;
      }

      if (!comment) {
        logger.warn('Comment not found or unauthorized', { commentId, userId: req.user.id });
        const response: ApiResponse = {
          success: false,
          error: 'Comment not found or unauthorized',
        };
        return res.status(404).json(response);
      }

      logger.info('Comment updated successfully', { 
        commentId,
        userId: req.user.id 
      });

      const response: ApiResponse = {
        success: true,
        data: comment,
        message: 'Comment updated and submitted for approval',
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const commentController = new CommentController();