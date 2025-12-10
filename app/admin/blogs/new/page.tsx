'use client'

import { BlogForm } from '@/components/admin/blog-form'

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <BlogForm />
    </div>
  )
}

