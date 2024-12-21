// src/app/page.tsx
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

const posts = [
  {
    id: 1,
    username: "UserOne",
    description: "Learn about building modern applications with Next.js.",
    topic: "next-js",
  },
  {
    id: 2,
    username: "UserTwo",
    description: "Master the fundamentals of JavaScript with this post.",
    topic: "javascript",
  },
  {
    id: 3,
    username: "UserThree",
    description: "Get started with Python and its versatile applications.",
    topic: "python",
  },
  {
    id: 4,
    username: "UserFour",
    description: "Explore the world of ethical hacking and cybersecurity.",
    topic: "ethical-hacking",
  },
  {
    id: 5,
    username: "UserFive",
    description:
      "Unleash your creativity with advanced video editing techniques.",
    topic: "video-editing",
  },
  {
    id: 6,
    username: "UserSix",
    description: "Dive into the exciting field of Artificial Intelligence.",
    topic: "ai",
  },
  {
    id: 7,
    username: "UserSeven",
    description: "Discover the power of ShadCN UI for modern UIs.",
    topic: "shadcn-ui",
  },
  {
    id: 8,
    username: "UserEight",
    description: "Learn to manage databases effectively with PostgreSQL.",
    topic: "postgres-sql",
  },
  {
    id: 9,
    username: "UserNine",
    description:
      "Understand the benefits of using Sanity for content management.",
    topic: "sanity",
  },
];

export default function HomePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Welcome to the Dynamic Blog
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <FaUserCircle className="text-blue-600 text-3xl mr-2" />
              <span className="font-semibold text-gray-800">
                {post.username}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <Link href={`/posts/${post.id}`}>
              <p className="text-blue-600 hover:underline">Read more</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
