import { getUserId, Context } from '../../utils'

export const user = {

  async deleteUser(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx)
    const userExists = await ctx.db.exists.User({
      id: userId,
    })
    if (!userExists) {
      throw new Error(`User not found.`)
    }

    return ctx.db.mutation.deleteUser({ where: { id } })
  },

  async updateUser(parent, { id, username, avatar, resetExpires, resetToken, role, toDelete }, ctx: Context, info) {
    // const userId = getUserId(ctx)
    return ctx.db.mutation.updateUser(
      {
        where: { id: id },
        data: { 
          username: username,
          avatar: avatar,
          resetExpires: resetExpires,
          resetToken: resetToken,
          role: role,
          toDelete: toDelete
        },
      },
      info,
    )
  },
}
