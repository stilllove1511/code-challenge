import { Router } from 'express';
import { PostController } from '../controllers/postController';

const router = Router();
const postController = new PostController();

// GET /api/posts - Get all posts
router.get('/', postController.getAllPosts);

// GET /api/posts/published - Get published posts
router.get('/published', postController.getPublishedPosts);

// GET /api/posts/:id - Get post by ID
router.get('/:id', postController.getPostById);

// GET /api/posts/author/:authorId - Get posts by author
router.get('/author/:authorId', postController.getPostsByAuthor);

// POST /api/posts - Create new post
router.post('/', postController.createPost);

// PUT /api/posts/:id - Update post
router.put('/:id', postController.updatePost);

// DELETE /api/posts/:id - Delete post
router.delete('/:id', postController.deletePost);

export default router;
