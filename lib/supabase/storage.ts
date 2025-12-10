import { supabase } from './client'

const BUCKET_NAME = 'blog-images'

export interface UploadImageOptions {
  file: File
  folder?: string
  onProgress?: (progress: number) => void
}

export async function uploadImage({
  file,
  folder = '',
  onProgress,
}: UploadImageOptions): Promise<string> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder ? `${folder}/` : ''}${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = fileName

    // Upload file
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      throw error
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath)

    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL')
    }

    return urlData.publicUrl
  } catch (error: any) {
    console.error('Error uploading image:', error)
    throw new Error(error.message || 'Failed to upload image')
  }
}

export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // Extract file path from URL
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split('/')
    const bucketIndex = pathParts.indexOf(BUCKET_NAME)
    
    if (bucketIndex === -1) {
      throw new Error('Invalid image URL')
    }

    const filePath = pathParts.slice(bucketIndex + 1).join('/')

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath])

    if (error) {
      throw error
    }
  } catch (error: any) {
    console.error('Error deleting image:', error)
    // Don't throw - image deletion is not critical
  }
}

export function getImageUrl(path: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path)
  
  return data.publicUrl
}

