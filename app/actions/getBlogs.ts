import prisma from "../lib/prismadb"

export default async function getBlogs(){
    try {
        //render all blog posts from the database
        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt:'desc'
            }
        })

        // map through all the blogs to get them, reassign the createdAt property to the time that it was created
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