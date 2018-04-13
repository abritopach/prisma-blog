import * as jwt from 'jsonwebtoken'
import { Prisma } from './generated/prisma'

export interface Context {
  db: Prisma
  request: any
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    let token = Authorization.replace('Bearer ', '')
    console.log('token', token);
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string }
    console.log('userId', userId);
    return userId
  }

  throw new AuthError()
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
