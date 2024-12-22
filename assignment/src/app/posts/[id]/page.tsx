// src/app/posts/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DOMPurify from "dompurify";
import React from "react";

const postContent: { [key: number]: { title: string; content: string } } = {
  1: {
    title: "Building Modern Applications with Next.js",
    content: `
      <p>Next.js is a powerful framework for building React applications. It provides features like:</p>
      <ul class="list-disc list-inside">
        <li>Server-side rendering (SSR) for better SEO.</li>
        <li>Static site generation (SSG) for blazing-fast performance.</li>
        <li>API routes to create backend endpoints with ease.</li>
      </ul>
      <p>Whether you're building a blog, e-commerce site, or dashboard, Next.js has you covered!</p>
    `,
  },
  2: {
    title: "Mastering JavaScript Fundamentals",
    content: `
      <p>JavaScript is the backbone of web development. It enables developers to create dynamic, interactive experiences. Topics to focus on include:</p>
      <ol class="list-decimal list-inside">
        <li>Understanding variables, scopes, and closures.</li>
        <li>Learning about async programming with promises and async/await.</li>
        <li>Exploring modern ES6+ features like arrow functions and destructuring.</li>
      </ol>
      <p>With strong JavaScript skills, you can conquer both frontend and backend development.</p>
    `,
  },
  3: {
    title: "Getting Started with Python",
    content: `
      <p>Python is a versatile programming language known for its simplicity and readability. Key areas to explore:</p>
      <ul class="list-disc list-inside">
        <li>Data types, variables, and operators.</li>
        <li>Control structures like loops and conditionals.</li>
        <li>Libraries and frameworks for web development, data science, and more.</li>
      </ul>
      <p>With Python, you can build anything from simple scripts to complex applications.</p>
    `,
  },
  4: {
    title: "Exploring Ethical Hacking and Cybersecurity",
    content: `
      <p>Ethical hacking is about understanding how cyberattacks occur and how to prevent them. Key topics include:</p>
      <ul class="list-disc list-inside">
        <li>Vulnerability analysis and penetration testing.</li>
        <li>Network security and cryptography.</li>
        <li>Creating secure systems and preventing cyber threats.</li>
      </ul>
      <p>Ethical hacking helps ensure that systems remain secure and data stays safe.</p>
    `,
  },
  5: {
    title: "Advanced Video Editing Techniques",
    content: `
      <p>Master video editing with powerful techniques to enhance your videos:</p>
      <ul class="list-disc list-inside">
        <li>Color correction and grading.</li>
        <li>Advanced transitions and effects.</li>
        <li>Sound editing and mixing for perfect audio.</li>
      </ul>
      <p>Unlock your creativity by using the most advanced video editing techniques.</p>
    `,
  },
  6: {
    title: "Artificial Intelligence for Beginners",
    content: `
      <p>Artificial Intelligence (AI) is revolutionizing technology. Topics to dive into include:</p>
      <ul class="list-disc list-inside">
        <li>Machine learning and deep learning algorithms.</li>
        <li>Natural language processing and AI ethics.</li>
        <li>AI applications in various industries.</li>
      </ul>
      <p>AI is a growing field with limitless opportunities to explore and create.</p>
    `,
  },
  7: {
    title: "Power of ShadCN UI for Modern UIs",
    content: `
      <p>ShadCN UI is a utility-first component library for building modern user interfaces. Learn how to:</p>
      <ul class="list-disc list-inside">
        <li>Utilize pre-built components to speed up development.</li>
        <li>Customize components using Tailwind CSS.</li>
        <li>Create responsive and aesthetically pleasing designs.</li>
      </ul>
      <p>ShadCN UI is perfect for building fast, modern applications with minimal effort.</p>
    `,
  },
  8: {
    title: "PostgreSQL for Efficient Database Management",
    content: `
      <p>PostgreSQL is an open-source relational database management system. Key features include:</p>
      <ul class="list-disc list-inside">
        <li>Advanced data types and performance optimization.</li>
        <li>Transaction management and ACID compliance.</li>
        <li>Integration with various programming languages.</li>
      </ul>
      <p>With PostgreSQL, you can handle large datasets and complex queries efficiently.</p>
    `,
  },
  9: {
    title: "Managing Content with Sanity",
    content: `
      <p>Sanity is a content platform for managing structured content. Some features include:</p>
      <ul class="list-disc list-inside">
        <li>Real-time collaboration and content versioning.</li>
        <li>Customizable content studio.</li>
        <li>Integration with front-end frameworks like Next.js and Gatsby.</li>
      </ul>
      <p>Sanity provides flexibility for developers and content creators to work together seamlessly.</p>
    `,
  },
};

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [postId, setPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      const id = parseInt(resolvedParams.id, 10);
      if (!isNaN(id)) {
        setPostId(id);
      } else {
        router.push("/404");
      }
    };

    fetchParams();
  }, [params, router]);

  if (postId === null) return <div>Loading...</div>;

  const post = postContent[postId];

  if (!post) {
    return <div>Post not found.</div>;
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments((prevComments) => [...prevComments, newComment.trim()]);
      setNewComment("");
    }
  };

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div className="flex justify-center items-center min-h-screen pt-12">
      <div className="prose lg:prose-xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Comments
          </h2>
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p>No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="p-4 border rounded-md shadow-sm">
                  <p>{comment}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleCommentSubmit} className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Write your comment..."
            />
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit Comment
            </button>
          </form>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
