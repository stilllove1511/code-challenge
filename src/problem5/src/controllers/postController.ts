import { Request, Response } from 'express';
import { PostService } from '../services/postService';
import { CreatePostDto, UpdatePostDto } from '../types';

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await this.postService.getAllPosts();
      res.json({
        success: true,
        data: posts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching posts',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  getPostById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid post ID'
        });
      }

      const post = await this.postService.getPostById(id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found'
        });
      }

      res.json({
        success: true,
        data: post
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching post',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  createPost = async (req: Request, res: Response) => {
    try {
      const { title, content, published, authorId }: CreatePostDto = req.body;

      if (!title || !authorId) {
        return res.status(400).json({
          success: false,
          message: 'Title and authorId are required'
        });
      }

      const post = await this.postService.createPost({
        title,
        content,
        published: published || false,
        authorId
      });

      res.status(201).json({
        success: true,
        data: post
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating post',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  updatePost = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid post ID'
        });
      }

      const { title, content, published }: UpdatePostDto = req.body;

      // Check if post exists
      const existingPost = await this.postService.getPostById(id);
      if (!existingPost) {
        return res.status(404).json({
          success: false,
          message: 'Post not found'
        });
      }

      const post = await this.postService.updatePost(id, {
        title,
        content,
        published
      });

      res.json({
        success: true,
        data: post
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating post',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  deletePost = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid post ID'
        });
      }

      // Check if post exists
      const existingPost = await this.postService.getPostById(id);
      if (!existingPost) {
        return res.status(404).json({
          success: false,
          message: 'Post not found'
        });
      }

      await this.postService.deletePost(id);
      res.json({
        success: true,
        message: 'Post deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting post',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  getPostsByAuthor = async (req: Request, res: Response) => {
    try {
      const authorId = parseInt(req.params.authorId);
      if (isNaN(authorId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid author ID'
        });
      }

      const posts = await this.postService.getPostsByAuthor(authorId);
      res.json({
        success: true,
        data: posts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching posts by author',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  getPublishedPosts = async (req: Request, res: Response) => {
    try {
      const posts = await this.postService.getPublishedPosts();
      res.json({
        success: true,
        data: posts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching published posts',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
}
