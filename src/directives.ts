import { Context, getUserId } from './utils'

const user = {
    async isLoggedIn(ctx: Context) {
      const userId = getUserId(ctx)
      if (!userId) throw new Error(`Not logged in`)
      return ctx.db.query.user({ where: { id: userId } })
    },
}

export const directiveResolvers = {

    /*
        hasRole: (next, source, { roles }, ctx: Context) => {
        const { role } = await directiveResolvers.isLoggedIn(ctx)
        console.log('role', role);
        if (roles.includes(role)) {
          return next()
        }
        throw new Error(`Unauthorized role, you don't have permission to perform this operation.`)
      }, 
    */

    async hasRole (next, source, { roles }, ctx: Context) {
      const { role } = await user.isLoggedIn(ctx)
      console.log('role', role);
      if (roles.includes(role)) {
        return next()
      }
      throw new Error(`Unauthorized role, you don't have permission to perform this operation.`)
    },  
}