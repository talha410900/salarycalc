'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Blog } from '@/lib/supabase/types'
import { BlogForm } from '@/components/admin/blog-form'
import { toast } from 'sonner'

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id === 'new') {
      setLoading(false)
      return
    }

    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setBlog(data)
    } catch (error) {
      console.error('Error fetching blog:', error)
      toast.error('Failed to fetch blog')
      router.push('/admin')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {id === 'new' ? 'Create New Blog Post' : 'Edit Blog Post'}
      </h1>
      <BlogForm blog={blog || undefined} />
    </div>
  )
}

