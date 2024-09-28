import type { Meta, StoryObj } from '@storybook/react'
import { MarkdownEditor } from '../src/components/MarkdownEditor'

const meta = {
  title: 'Example/MarkdownEditor',
  component: MarkdownEditor,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MarkdownEditor>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: ['# Hello World'],
    renderLimits: {
        top: 10,
        bottom: 10,
        lineHeight: 1,
    },
  },
}