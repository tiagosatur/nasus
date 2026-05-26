import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { post } from './sanity/schemas/post'
import { category } from './sanity/schemas/category'

export default defineConfig({
  name: 'nasus-digital',
  title: 'Nasus Digital',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: {
    types: [post, category],
  },
})
