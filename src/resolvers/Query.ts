import { getUserId, Context } from '../utils'

export const Query = {

  /* Post queries. */

  feed(parent, args, ctx: Context, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx: Context, info) {
    return ctx.db.query.post({ where: { id: id } }, info)
  },

  allPosts(parent, { filter, orderBy, skip, after, before, first, last }, ctx: Context, info) {
    return ctx.db.query.posts({ where: { } }, info)
  },

  async _allPostsMeta(parent, { filter, orderBy, skip, after, before, first, last }, ctx: Context, info) {
    // Retrieve (potentially filtered) element count.
    const postsConnection = await ctx.db.query.postsConnection(
      { where: {} },
      `{ aggregate { count } }`,
    )

    return {
      count: postsConnection.aggregate.count,
    }
  },

  /* User queries. */

  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },

  user(parent, { id }, ctx: Context, info) {
    return ctx.db.query.user({ where: { id: id } }, info)
  },

  allUsers(parent, { filter, orderBy, skip, after, before, first, last }, ctx: Context, info) {
    return ctx.db.query.users({ where: { } }, info)
  },

  /* Category queries. */

  category(parent, { id }, ctx: Context, info) {
    return ctx.db.query.category({ where: { id: id } }, info)
  },

  allCategories(parent, { filter, orderBy, skip, after, before, first, last }, ctx: Context, info) {
    return ctx.db.query.categories({ where: { } }, info)
  },

}
