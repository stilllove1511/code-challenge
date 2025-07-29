import { Request, Response, NextFunction } from 'express'
import { PostService } from '../services/postService'
import { CreatePostDto, UpdatePostDto } from '../types'
import * as response from '../utils/response'

export class PostController {
    private postService: PostService

    constructor() {
        this.postService = new PostService()
    }

    getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await this.postService.getAllPosts()
            return response.ok(res, posts)
        } catch (err) {
            next(err)
        }
    }

    getPostById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return response.badRequest(res, 'Invalid post ID')

            const post = await this.postService.getPostById(id)
            if (!post) return response.notFound(res, 'Post not found')

            return response.ok(res, post)
        } catch (err) {
            next(err)
        }
    }

    createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, content, published, authorId }: CreatePostDto =
                req.body
            if (!title || !authorId)
                return response.badRequest(
                    res,
                    'Title and authorId are required'
                )

            const post = await this.postService.createPost({
                title,
                content,
                published: published || false,
                authorId,
            })

            return response.created(res, post)
        } catch (err) {
            next(err)
        }
    }

    updatePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return response.badRequest(res, 'Invalid post ID')

            const { title, content, published }: UpdatePostDto = req.body

            // Check if post exists
            const existingPost = await this.postService.getPostById(id)
            if (!existingPost) return response.notFound(res, 'Post not found')

            const post = await this.postService.updatePost(id, {
                title,
                content,
                published,
            })

            return response.ok(res, post)
        } catch (err) {
            next(err)
        }
    }

    deletePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return response.badRequest(res, 'Invalid post ID')

            // Check if post exists
            const existingPost = await this.postService.getPostById(id)
            if (!existingPost) return response.notFound(res, 'Post not found')

            await this.postService.deletePost(id)
            return response.ok(res, id)
        } catch (err) {
            next(err)
        }
    }

    getPostsByAuthor = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const authorId = parseInt(req.params.authorId)
            if (isNaN(authorId))
                return response.badRequest(res, 'Invalid author ID')

            const posts = await this.postService.getPostsByAuthor(authorId)
            return response.ok(res, posts)
        } catch (err) {
            next(err)
        }
    }

    getPublishedPosts = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const posts = await this.postService.getPublishedPosts()
            return response.ok(res, posts)
        } catch (err) {
            next(err)
        }
    }
}
