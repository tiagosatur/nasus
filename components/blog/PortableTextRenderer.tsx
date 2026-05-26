'use client'

import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage } from '@/lib/sanity/types'

interface CodeBlockValue {
  language?: string
  code?: string
}

interface ImageValue extends SanityImage {
  caption?: string
}

interface RawBlock {
  _type: string
  _key?: string
  style?: string
  children?: Array<{ text: string; marks?: string[] }>
}

interface MarkdownTableBlock {
  _type: 'markdownTable'
  _key: string
  rows: string[][]
}

// Groups consecutive pipe-delimited text blocks into table nodes
function preprocessBody(body: unknown[]): unknown[] {
  const result: unknown[] = []
  let tableRows: string[][] = []
  let tableKey = ''

  const flushTable = () => {
    if (tableRows.length === 0) return
    result.push({ _type: 'markdownTable', _key: tableKey, rows: tableRows } as MarkdownTableBlock)
    tableRows = []
    tableKey = ''
  }

  for (const block of body) {
    const b = block as RawBlock
    if (b._type !== 'block' || !b.children || b.style !== 'normal') {
      flushTable()
      result.push(block)
      continue
    }

    const text = b.children.map(c => c.text ?? '').join('').trim()
    const isSeparator = /^\|[-| :]+\|$/.test(text)
    const isTableRow = text.startsWith('|') && text.endsWith('|') && text.length > 2

    if (isSeparator) continue // skip `|---|---|` rows

    if (isTableRow) {
      if (tableRows.length === 0) tableKey = b._key ?? String(result.length)
      const cells = text.slice(1, -1).split('|').map(c => c.trim())
      tableRows.push(cells)
    } else {
      flushTable()
      result.push(block)
    }
  }

  flushTable()
  return result
}

const components = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt ?? ''}
            width={800}
            height={450}
            className="rounded-md w-full"
          />
          {value.caption && (
            <figcaption className="text-xs text-text-muted text-center mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    codeBlock: ({ value }: { value: CodeBlockValue }) => (
      <pre className="bg-surface-dark rounded-md p-4 my-6 overflow-x-auto">
        <code className="font-mono text-sm text-text-inverse whitespace-pre">
          {value.code}
        </code>
      </pre>
    ),
    markdownTable: ({ value }: { value: MarkdownTableBlock }) => {
      const [header, ...body] = value.rows
      if (!header) return null
      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                {header.map((cell, i) => (
                  <th
                    key={i}
                    className="text-left py-2 px-4 font-semibold text-text-primary bg-bg-secondary first:pl-0 last:pr-0"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="border-b border-border hover:bg-bg-secondary/50 transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-2.5 px-4 text-text-secondary first:pl-0 last:pr-0">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display text-2xl text-text-primary mt-10 mb-4 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display text-xl text-text-primary mt-8 mb-3 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-base font-semibold text-text-primary mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-base text-text-secondary leading-relaxed mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-accent pl-5 my-6 italic text-text-secondary break-words">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-text-secondary">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-text-secondary">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="font-mono text-sm bg-bg-secondary text-accent px-1.5 py-0.5 rounded-sm">
        {children}
      </code>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-accent underline underline-offset-2 hover:text-text-primary transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
}

export function PortableTextRenderer({ body }: { body: unknown[] }) {
  const processed = preprocessBody(body)
  return (
    <div className="prose-nasus break-words">
      <PortableText value={processed as Parameters<typeof PortableText>[0]['value']} components={components} />
    </div>
  )
}
