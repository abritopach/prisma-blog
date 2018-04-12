import { getUserId, Context } from '../../utils'

export const post = {
  async createDraft(parent, { title, content }, ctx: Context, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createPost(
      {
        data: {
          title,
          content,
          isPublished: false,
          author: {
            connect: { id: userId },
          },
          likes: 0,
        },
      },
      info
    )
  },

  async createPost(parent, { title, content, image, isPublished }, ctx: Context, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createPost(
      {
        data: {
          title,
          content,
          image,
          isPublished,
          author: {
            connect: { id: userId },
          },
          likes: 0,
        },
      },
      info
    )
  },

  async updatePost(parent, { id, content, image, likes, title }, ctx: Context, info) {
    const userId = getUserId(ctx)
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.updatePost(
      {
        where: { id },
        data: { 
          content: content,
          image: image,
          likes: likes,
          title: title
        },
      },
      info,
    )
  },

  async publish(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx)
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.updatePost(
      {
        where: { id },
        data: { isPublished: true },
      },
      info,
    )
  },

  async deletePost(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx)
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.deletePost({ where: { id } }, info)
  },
}