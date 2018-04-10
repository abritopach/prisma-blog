import { Context } from '../../utils'

export const category = {
  async createCategory(parent, { name, posts }, ctx: Context, info) {
    return ctx.db.mutation.createCategory(
      {
        data: {
          name,
          posts
        },
      },
      info
    )
  },

  async deleteCategory(parent, { id }, ctx: Context, info) {
    const categoryExists = await ctx.db.exists.Category({
      id: id,
    })
    if (!categoryExists) {
      throw new Error(`Category not found.`)
    }

    return ctx.db.mutation.deleteCategory({ where: { id } })
  },

}
