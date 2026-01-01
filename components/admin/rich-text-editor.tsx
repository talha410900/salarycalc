'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { Underline } from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { CodeBlock } from '@tiptap/extension-code-block'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { Typography } from '@tiptap/extension-typography'
import { Callout } from './callout-extension'
import { Button } from '@/components/ui/button'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Minus,
  Code2,
  Table as TableIcon,
  CheckSquare,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Palette,
  Highlighter,
  Type,
  Eraser,
  FileCode,
  MessageSquare,
} from 'lucide-react'
import { useCallback, useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { uploadImage } from '@/lib/supabase/storage'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
}

const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Gray', value: '#6B7280' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Green', value: '#22C55E' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#A855F7' },
  { name: 'Pink', value: '#EC4899' },
]

const HIGHLIGHT_COLORS = [
  { name: 'Yellow', value: '#FEF08A' },
  { name: 'Green', value: '#D1FAE5' },
  { name: 'Blue', value: '#DBEAFE' },
  { name: 'Pink', value: '#FCE7F3' },
  { name: 'Orange', value: '#FED7AA' },
]

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
  className,
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false)
  const [highlightPopoverOpen, setHighlightPopoverOpen] = useState(false)
  const [htmlDialogOpen, setHtmlDialogOpen] = useState(false)
  const [htmlContent, setHtmlContent] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: false, // We'll use the separate extension
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      HorizontalRule,
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'rounded-md bg-muted p-4 font-mono text-sm',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse border border-border',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-border bg-muted',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-border px-4 py-2',
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'list-none pl-0',
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'flex items-start gap-2',
        },
      }),
      Subscript,
      Superscript,
      Typography,
      Callout,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[300px] p-4 prose prose-sm max-w-none',
      },
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML() && mounted) {
      const { from, to } = editor.state.selection
      editor.commands.setContent(content)
      if (from !== undefined && to !== undefined) {
        editor.commands.setTextSelection({ from, to })
      }
    }
  }, [content, editor, mounted])

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    try {
      setUploadingImage(true)
      const url = await uploadImage({
        file,
        folder: 'content',
      })
      setImageUrl(url)
      if (editor) {
        editor.chain().focus().setImage({ src: url, alt: imageAlt || '' }).run()
        setImageDialogOpen(false)
        setImageUrl('')
        setImageAlt('')
        toast.success('Image uploaded successfully')
      }
    } catch (error: any) {
      console.error('Error uploading image:', error)
      toast.error(error.message || 'Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleImageUrlSubmit = () => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt || '' }).run()
      setImageDialogOpen(false)
      setImageUrl('')
      setImageAlt('')
    }
  }

  const addImage = useCallback(() => {
    setImageDialogOpen(true)
  }, [])

  const addLink = useCallback(() => {
    if (!editor) return
    
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL:', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const insertTable = useCallback(() => {
    if (!editor) return
    try {
      (editor.chain().focus() as any).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    } catch (e) {
      toast.error('Table insertion failed. Please try again.')
    }
  }, [editor])

  const addHorizontalRule = useCallback(() => {
    if (!editor) return
    editor.chain().focus().setHorizontalRule().run()
  }, [editor])

  const insertHtml = useCallback(() => {
    if (!editor || !htmlContent.trim()) return
    editor.chain().focus().insertContent(htmlContent).run()
    setHtmlDialogOpen(false)
    setHtmlContent('')
    toast.success('HTML inserted successfully')
  }, [editor, htmlContent])

  if (!mounted || !editor) {
    return (
      <div className={cn('border rounded-lg overflow-hidden', className)}>
        <div className="border-b p-2 flex flex-wrap gap-1 bg-muted/50">
          <div className="h-8 w-8 bg-muted animate-pulse rounded" />
        </div>
        <div className="min-h-[400px] p-4 flex items-center justify-center text-muted-foreground">
          Loading editor...
        </div>
      </div>
    )
  }

  return (
    <div className={cn('border rounded-lg overflow-hidden', className)}>
      <div className="border-b p-2 flex flex-wrap gap-1 bg-muted/50 overflow-x-auto">
        {/* Text Formatting */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(editor.isActive('bold') && 'bg-muted')}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(editor.isActive('italic') && 'bg-muted')}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(editor.isActive('underline') && 'bg-muted')}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(editor.isActive('strike') && 'bg-muted')}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={cn(editor.isActive('code') && 'bg-muted')}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            try {
              (editor.chain().focus() as any).toggleSubscript().run()
            } catch (e) {
              toast.error('Subscript not available')
            }
          }}
          className={cn(editor.isActive('subscript') && 'bg-muted')}
          title="Subscript"
        >
          <SubscriptIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            try {
              (editor.chain().focus() as any).toggleSuperscript().run()
            } catch (e) {
              toast.error('Superscript not available')
            }
          }}
          className={cn(editor.isActive('superscript') && 'bg-muted')}
          title="Superscript"
        >
          <SuperscriptIcon className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />

        {/* Text Color */}
        <Popover open={colorPopoverOpen} onOpenChange={setColorPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(editor.isActive('textStyle') && 'bg-muted')}
              title="Text Color"
            >
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <Label>Text Color</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    try {
                      (editor.chain().focus() as any).unsetColor().run()
                    } catch (e) {
                      editor.chain().focus().unsetMark('textStyle').run()
                    }
                    setColorPopoverOpen(false)
                  }}
                  className="w-full"
                >
                  Default
                </Button>
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => {
                      try {
                        (editor.chain().focus() as any).setColor(color.value).run()
                      } catch (e) {
                        editor.chain().focus().setMark('textStyle', { color: color.value }).run()
                      }
                      setColorPopoverOpen(false)
                    }}
                    className="h-8 w-full rounded border border-border hover:border-primary transition-colors"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Highlight Color */}
        <Popover open={highlightPopoverOpen} onOpenChange={setHighlightPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(editor.isActive('highlight') && 'bg-muted')}
              title="Highlight"
            >
              <Highlighter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <Label>Highlight Color</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    try {
                      (editor.chain().focus() as any).unsetHighlight().run()
                    } catch (e) {
                      editor.chain().focus().unsetMark('highlight').run()
                    }
                    setHighlightPopoverOpen(false)
                  }}
                  className="w-full"
                >
                  None
                </Button>
                {HIGHLIGHT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => {
                      try {
                        (editor.chain().focus() as any).toggleHighlight({ color: color.value }).run()
                      } catch (e) {
                        editor.chain().focus().toggleMark('highlight', { color: color.value }).run()
                      }
                      setHighlightPopoverOpen(false)
                    }}
                    className="h-8 w-full rounded border border-border hover:border-primary transition-colors"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Headings */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(editor.isActive('heading', { level: 1 }) && 'bg-muted')}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(editor.isActive('heading', { level: 2 }) && 'bg-muted')}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={cn(editor.isActive('heading', { level: 3 }) && 'bg-muted')}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={cn(editor.isActive('heading', { level: 4 }) && 'bg-muted')}
          title="Heading 4"
        >
          <Heading4 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={cn(editor.isActive('heading', { level: 5 }) && 'bg-muted')}
          title="Heading 5"
        >
          <Heading5 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={cn(editor.isActive('heading', { level: 6 }) && 'bg-muted')}
          title="Heading 6"
        >
          <Heading6 className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />

        {/* Lists */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(editor.isActive('bulletList') && 'bg-muted')}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(editor.isActive('orderedList') && 'bg-muted')}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={cn(editor.isActive('taskList') && 'bg-muted')}
          title="Task List"
        >
          <CheckSquare className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(editor.isActive('blockquote') && 'bg-muted')}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            if (!editor) return
            
            const chain = editor.chain().focus()
            
            // Check if we're in a callout
            if (editor.isActive('callout')) {
              // Try to lift out of callout
              try {
                chain.lift('callout').run()
              } catch (e) {
                console.error('Error lifting callout:', e)
                toast.error('Could not remove callout')
              }
            } else {
              // Wrap in callout
              try {
                chain.wrapIn('callout').run()
              } catch (e) {
                console.error('Error wrapping in callout:', e)
                toast.error('Could not create callout')
              }
            }
          }}
          className={cn(editor.isActive('callout') && 'bg-muted')}
          title="Callout Box"
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(editor.isActive('codeBlock') && 'bg-muted')}
          title="Code Block"
        >
          <Code2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setHtmlDialogOpen(true)}
          title="Insert HTML"
        >
          <FileCode className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />

        {/* Alignment */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            try {
              (editor.chain().focus() as any).setTextAlign('left').run()
            } catch (e) {
              editor.chain().focus().setNode('paragraph', { textAlign: 'left' }).run()
            }
          }}
          className={cn(editor.isActive({ textAlign: 'left' }) && 'bg-muted')}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            try {
              (editor.chain().focus() as any).setTextAlign('center').run()
            } catch (e) {
              editor.chain().focus().setNode('paragraph', { textAlign: 'center' }).run()
            }
          }}
          className={cn(editor.isActive({ textAlign: 'center' }) && 'bg-muted')}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            try {
              (editor.chain().focus() as any).setTextAlign('right').run()
            } catch (e) {
              editor.chain().focus().setNode('paragraph', { textAlign: 'right' }).run()
            }
          }}
          className={cn(editor.isActive({ textAlign: 'right' }) && 'bg-muted')}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            try {
              (editor.chain().focus() as any).setTextAlign('justify').run()
            } catch (e) {
              editor.chain().focus().setNode('paragraph', { textAlign: 'justify' }).run()
            }
          }}
          className={cn(editor.isActive({ textAlign: 'justify' }) && 'bg-muted')}
          title="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />

        {/* Insert */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addLink}
          className={cn(editor.isActive('link') && 'bg-muted')}
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addImage}
          title="Insert Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertTable}
          title="Insert Table"
        >
          <TableIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addHorizontalRule}
          title="Insert Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />

        {/* Table Controls - Available when cursor is in a table */}
        {editor.isActive('table') && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                try {
                  (editor.chain().focus() as any).addColumnBefore().run()
                } catch (e) {
                  toast.error('Cannot add column before')
                }
              }}
              title="Add Column Before"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                try {
                  (editor.chain().focus() as any).addColumnAfter().run()
                } catch (e) {
                  toast.error('Cannot add column after')
                }
              }}
              title="Add Column After"
            >
              <Type className="h-4 w-4 rotate-180" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                try {
                  (editor.chain().focus() as any).deleteColumn().run()
                } catch (e) {
                  toast.error('Cannot delete column')
                }
              }}
              title="Delete Column"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                try {
                  (editor.chain().focus() as any).addRowBefore().run()
                } catch (e) {
                  toast.error('Cannot add row before')
                }
              }}
              title="Add Row Before"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                try {
                  (editor.chain().focus() as any).addRowAfter().run()
                } catch (e) {
                  toast.error('Cannot add row after')
                }
              }}
              title="Add Row After"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                try {
                  (editor.chain().focus() as any).deleteRow().run()
                } catch (e) {
                  toast.error('Cannot delete row')
                }
              }}
              title="Delete Row"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                try {
                  (editor.chain().focus() as any).deleteTable().run()
                } catch (e) {
                  toast.error('Cannot delete table')
                }
              }}
              title="Delete Table"
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
          </>
        )}

        {/* Actions */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          title="Clear Formatting"
        >
          <Eraser className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} className="min-h-[400px] max-h-[600px] overflow-y-auto" />
      
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>
              Upload an image or paste an image URL
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Image</label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(file)
                  }}
                  className="hidden"
                  disabled={uploadingImage}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="w-full"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Choose File
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Max 5MB
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://taxsal.com/image.jpg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleImageUrlSubmit()
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleImageUrlSubmit}
                  disabled={!imageUrl}
                >
                  Insert
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Alt Text (for accessibility and SEO)</label>
              <Input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Describe the image for screen readers"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && imageUrl) {
                    handleImageUrlSubmit()
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                Alt text helps with accessibility and SEO. Describe what the image shows.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* HTML Insert Dialog */}
      <Dialog open={htmlDialogOpen} onOpenChange={setHtmlDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Insert HTML</DialogTitle>
            <DialogDescription>
              Paste your HTML code below. It will be rendered as-is in the blog content.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="html-content">HTML Code</Label>
              <Textarea
                id="html-content"
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="<div class='my-custom-class'>Your HTML here...</div>"
                rows={10}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Note: Some HTML elements may be sanitized for security. Common tags like div, span, table, img, a, p, h1-h6, ul, ol, li are supported.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setHtmlDialogOpen(false)
                  setHtmlContent('')
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={insertHtml}
                disabled={!htmlContent.trim()}
              >
                Insert HTML
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
