"use client";

import { SafeBlogs, SafeUser } from "@/types";
import Image from "next/image";

interface BlogProps {
  key: string;
  data: SafeBlogs;
  currentUser: SafeUser | null;
}
export default function SingleBlog({ data, key, currentUser }: BlogProps) {
  return (
    <div className="w-[1100px] border-2 p-4">
      <div>
        <div className="flex gap-2 justify-between items-center">
          <Image
            src={data.imageSrc}
            width={400}
            height={300}
            alt="Blog Image"
          />

          <div className="w-[530px] flex flex-col gap-4 leading-[1.5]">
            <h1>{data.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
