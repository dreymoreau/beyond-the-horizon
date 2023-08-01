import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

import prisma from "../../lib/prismadb"

export async function POST(
    // coming from register page
    request: Request
) {
    const body = await request.json();

    const {
        email,
        name,
        password
    } = body

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    })
    return NextResponse.json(user)
} 