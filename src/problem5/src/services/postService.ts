import { prisma } from '../config/database'
import { CreatePostDto, UpdatePostDto } from '../types'

export class PostService {
    async getAllPosts() {
        return await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
        })
    }

    async getPostById(id: number) {
        return await prisma.post.findUnique({
            where: { id },
        })
    }

    async createPost(data: CreatePostDto) {
        return await prisma.post.create({
            data,
        })
    }

    async updatePost(id: number, data: UpdatePostDto) {
        return await prisma.post.update({
            where: { id },
            data,
        })
    }

    async deletePost(id: number) {
        return await prisma.post.delete({
            where: { id },
        })
    }

    async getPostsByAuthor(authorId: number) {
        return await prisma.post.findMany({
            where: { authorId },
            orderBy: { createdAt: 'desc' },
        })
    }

    async getPublishedPosts() {
        return await prisma.post.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
        })
    }
}
