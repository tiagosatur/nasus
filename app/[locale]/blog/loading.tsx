import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

function Bone({ className = '' }: { className?: string }) {
  return <div className={`bg-bg-secondary rounded-sm animate-pulse ${className}`} />
}

export default function BlogLoading() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary flex-1 flex flex-col pt-[104px]">

        {/* Page header */}
        <div className="px-6 md:px-12 lg:px-24 pt-10 pb-10">
          <div className="max-w-6xl mx-auto flex items-start justify-between gap-8">
            <div className="flex flex-col gap-3">
              <Bone className="h-10 md:h-12 w-36 md:w-48" />
              <Bone className="h-4 w-56 md:w-72" />
            </div>
            <div className="hidden sm:flex gap-2 pt-2">
              <Bone className="h-7 w-20" />
              <Bone className="h-7 w-24" />
              <Bone className="h-7 w-16" />
            </div>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-24 pb-16 flex-1">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">

            {/* Featured card skeleton */}
            <div className="bg-bg-card border border-border rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1.1fr]">
              <div className="flex flex-col justify-center p-8 md:p-12 gap-5 order-2 md:order-1">
                <Bone className="h-5 w-20" />
                <div className="flex flex-col gap-2">
                  <Bone className="h-8 w-full" />
                  <Bone className="h-8 w-4/5" />
                  <Bone className="h-8 w-3/5" />
                </div>
                <div className="flex flex-col gap-2">
                  <Bone className="h-4 w-full" />
                  <Bone className="h-4 w-11/12" />
                  <Bone className="h-4 w-3/4" />
                </div>
                <Bone className="h-3 w-32" />
                <Bone className="h-4 w-24" />
              </div>
              <div className="order-1 md:order-2 bg-bg-secondary min-h-[240px] md:min-h-[360px]" />
            </div>

            {/* Editorial list skeleton */}
            <div className="divide-y divide-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-5 md:gap-8 py-7 px-1">
                  <Bone className="flex-shrink-0 w-32 md:w-44 aspect-video self-start" />
                  <div className="flex flex-col gap-2.5 flex-1 min-w-0">
                    <Bone className="h-4 w-16" />
                    <Bone className="h-6 w-4/5" />
                    <Bone className="h-6 w-3/5" />
                    <Bone className="h-3.5 w-full" />
                    <Bone className="h-3.5 w-11/12" />
                    <Bone className="h-3 w-28 mt-1" />
                  </div>
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
