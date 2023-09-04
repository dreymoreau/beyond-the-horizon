import prisma from "../lib/prismadb"

export default async function getBlogs(){
    try {
        //render all blog posts from the database
        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt:'desc'
            }
        })

        const safeBlogs = blogs.map((blog) => ({
            ...blogs,
            createdAt: blog.createdAt.toISOString()
        }))

        return safeBlogs
    }
    
      catch(err:any){
        throw new Error(err)
    }
}