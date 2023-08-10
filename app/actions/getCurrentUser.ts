import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma  from "../lib/prismadb";

export async function getSession() {
    return await getServerSession(authOptions)
    
}

export default async function getCurrentUser(){
    try {

        const session = await getSession()

        if(!session?.user?.email){
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        // if user doesnt exist return null
        if(!currentUser){
            return null
        }

        // returning user
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        }
    } catch(error: any){
        return null
    }
}