import { Context, getUserId } from './utils'

const user = {
    async isLoggedIn(ctx: Context) {
      const userId = getUserId(ctx)
      if (!userId) throw new Error(`Not logged in`)
      return ctx.db.query.user({ where: { id: userId } })
    },
}

const isRequestingUserAlsoOwner = ({ ctx, userId, type, typeId }) =>
  ctx.db.exists[type]({ id: typeId, user: { id: userId } })

export const directiveResolvers = {

    isAuthenticated: async (next, source, args, ctx: Context) => {
        await user.isLoggedIn(ctx)
        return next()
    },

    hasRole: async (next, source, { roles }, ctx: Context) => {
      const { role } = await user.isLoggedIn(ctx)
      console.log('role', role);
      if (roles.includes(role)) {
        return next()
      }
      throw new Error(`Unauthorized role, you don't have permission to perform this operation.`)
    },  

    isOwnerOrHasRole: async (next, source, { roles, type }, ctx: Context, ...p) => {
        console.log('p', p);
        const { id: userId, role } = await user.isLoggedIn(ctx)
        console.log('id', userId, 'role', role);
        if (roles.includes(role)) {
          return next()
        }
    
        console.log('ctx.request.body', ctx.request.body);
        const { id: typeId } = ctx.request.body.variables
        const isOwner = await isRequestingUserAlsoOwner({
          ctx,
          userId,
          type,
          typeId
        })
    
        if (isOwner) {
          return next()
        }
        throw new Error(`Unauthorized, not owner or incorrect role.`)
      }
}