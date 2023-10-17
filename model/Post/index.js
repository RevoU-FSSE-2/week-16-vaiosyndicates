import { PrismaClient } from '@prisma/client'
import { respHelper } from '../../util/index.js'

const prisma = new PrismaClient()

export const getAllPost = async () => {
  const posts = await prisma.post.findMany()
  return posts
}

export const createPost = async (title, id) => {
  const users = await prisma.post.create({
    data: {
      title: title,
      authorId: id
    },
  })

  return respHelper(200)
}

export const deletePost = async (id, authorId) => {
  const post = await prisma.post.deleteMany({ where: { id: id, authorId: authorId } });
  if(post.count > 0) {
    return respHelper(200, post)
  } else {
    return respHelper(404)
  }
}