import { Node, mergeAttributes } from '@tiptap/core'
import type { Commands } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      setCallout: () => ReturnType
      toggleCallout: () => ReturnType
      unsetCallout: () => ReturnType
    }
  }
}

export const Callout = Node.create({
  name: 'callout',

  group: 'block',

  content: 'block+',

  parseHTML() {
    return [
      {
        tag: 'div[data-type="callout"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'callout',
      }),
      0,
    ]
  },

  addCommands() {
    return {
      setCallout:
        () =>
        ({ commands }: any) => {
          return commands.wrapIn(this.type)
        },
      toggleCallout:
        () =>
        ({ commands, state }: any) => {
          const { selection } = state
          const { $from } = selection
          
          // Check if we're already in a callout
          let inCallout = false
          for (let depth = $from.depth; depth > 0; depth--) {
            const node = $from.node(depth)
            if (node.type.name === this.name) {
              inCallout = true
              break
            }
          }
          
          if (inCallout) {
            return commands.lift(this.type)
          } else {
            return commands.wrapIn(this.type)
          }
        },
      unsetCallout:
        () =>
        ({ commands }: any) => {
          return commands.lift(this.type)
        },
    } as any
  },
})

