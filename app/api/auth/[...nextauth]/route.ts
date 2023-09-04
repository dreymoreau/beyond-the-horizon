import bcrypt from 'bcrypt'
import NextAuth, {AuthOptions} from 'next-auth'
import CredentialsProvider  from 'next-auth/providers/credentials'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import prisma from "../../../lib/prismadb"

export const authOptions:AuthOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        CredentialsProvider({
            
            credentials: {
            email: {label: 'email', type: 'text'},
            password: {label: 'password', type: 'password'}
            },

            // getting data from the database, checking first if there is no user than throw error
            // if use exists, use findUnique method from prisma
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid Credentials');
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email:credentials.email
                    }
                })
                // checking if user or password doesnt exist, throw error
                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid Credentials');
                }
                // compare the credentials password and the hashed password to ensure they match
                const isCorrect = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if(!isCorrect){
                    throw new Error('Invalid credentials')
                }
                return user
            }
        })
    ],
    pages: {
        signIn: '/'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}