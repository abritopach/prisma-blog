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

}
