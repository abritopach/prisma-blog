import { Query } from './Query'
import { auth } from './Mutation/auth'
import { user } from './Mutation/user'
import { post } from './Mutation/post'
import { category } from './Mutation/category'
import { AuthPayload } from './AuthPayload'
import { Subscription} from './Subscription'

export default {
  Query,
  Mutation: {
    ...auth,
    ...user,
    ...post,
    ...category
  },
  Subscription,
  AuthPayload,
}
