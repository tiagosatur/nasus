import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'language', type: 'string', title: 'Language' }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
    defineField({ name: 'excerpt', type: 'text', title: 'Excerpt', rows: 3 }),
    defineField({ name: 'readingTime', type: 'number', title: 'Reading Time (min)' }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })] },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' },
  },
})
