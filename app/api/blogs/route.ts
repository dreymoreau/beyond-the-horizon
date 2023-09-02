import {NextResponse} from "next/server"
import prisma from '../../lib/prismadb'

import getCurrentUser from "@/app/actions/getCurrentUser"

// creating post request
export async function POST(
    request:Request
){
    const currentUser = await getCurrentUser()
    
    // if current user doesnt exist
    if(!currentUser) {
        // dont want to return error to break application just null
        return null
    }

    const body = await request.json()

    const {name, description,imageSrc} = body
    
    //creating the data for the user
    const blog = await prisma.blog.create({
        data: {
            name,
            imageSrc,
            description,
            userId:currentUser.id 
        }
    })
    return NextResponse.json(blog);
 }