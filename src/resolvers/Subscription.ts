export const Subscription = {

  /* User subscriptions. */
  users: {
    subscribe: async (parent, args, ctx, info) => {
      return ctx.db.subscription.user({}, info)
    },
  },

  /* Post subscriptions. */
  publications: {
    subscribe: async (parent, args, ctx, info) => {
      return ctx.db.subscription.post({}, info)
    },
  },
  

}
