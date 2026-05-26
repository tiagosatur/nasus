import React from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

function Bone({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`bg-bg-secondary rounded-sm animate-pulse ${className}`} style={style} />
}

export default function PostLoading() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary pt-[104px]">

        {/* Post header */}
        <header className="pt-10 pb-12 px-6 md:px-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-5">
            <Bone className="h-4 w-28" />
            <Bone className="h-5 w-20" />
            <div className="flex flex-col gap-2.5">
              <Bone className="h-10 md:h-12 w-full" />
              <Bone className="h-10 md:h-12 w-4/5" />
              <Bone className="h-10 md:h-12 w-3/5" />
            </div>
            <div className="flex flex-col gap-2">
              <Bone className="h-5 w-full" />
              <Bone className="h-5 w-3/4" />
            </div>
            <Bone className="h-4 w-64" />
          </div>
        </header>

        {/* Cover image */}
        <div className="px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="w-full aspect-[2.5/1] bg-bg-secondary rounded-sm animate-pulse" />
          </div>
        </div>

        {/* Body */}
        <div className="bg-bg-primary py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {[100, 95, 88, 100, 72, 90, 83, 100, 60, 78, 92, 55].map((w, i) => (
              <Bone key={i} className="h-4" style={{ width: `${w}%` }} />
            ))}

            <div className="mt-8 mb-2 flex flex-col gap-2">
              <Bone className="h-7 w-64" />
              {[100, 88, 95, 72, 90].map((w, i) => (
                <Bone key={i} className="h-4" style={{ width: `${w}%` }} />
              ))}
            </div>

            {/* Author bio */}
            <div className="mt-16 pt-8 border-t border-border flex gap-4 items-start">
              <div className="w-14 h-14 rounded-full bg-bg-secondary animate-pulse flex-shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <Bone className="h-4 w-28" />
                <Bone className="h-3.5 w-full" />
                <Bone className="h-3.5 w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-surface-terra px-6 md:px-12 lg:px-24 py-16">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
            <Bone className="h-9 w-72 bg-[rgba(255,255,255,0.15)]" />
            <Bone className="h-4 w-56 bg-[rgba(255,255,255,0.1)]" />
            <Bone className="h-10 w-44 mt-2 bg-[rgba(255,255,255,0.15)]" />
          </div>
        </div>

        {/* Related posts */}
        <div className="bg-bg-secondary px-6 md:px-12 lg:px-24 py-16">
          <div className="max-w-6xl mx-auto">
            <Bone className="h-7 w-40 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Bone className="w-full aspect-video" />
                  <Bone className="h-4 w-16" />
                  <Bone className="h-5 w-full" />
                  <Bone className="h-5 w-3/4" />
                  <Bone className="h-3.5 w-full" />
                  <Bone className="h-3.5 w-4/5" />
                  <Bone className="h-3 w-28 mt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
