import Image from "next/image";
import getCurrentUser from "./actions/getCurrentUser";
import getBlogs from "./actions/getBlogs";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const blogs = await getBlogs();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {blogs.map((item) => (
        <div>
          <img src={item.imageSrc} alt=""></img>
        </div>
      ))}
    </main>
  );
}
