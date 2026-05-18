import { NamingTool } from "@/components/NamingTool"

export default function Home() {
  return (
    <div className="relative min-h-full bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60rem_30rem_at_50%_-10%,rgba(24,24,27,0.15),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.9),rgba(255,255,255,0.6))] dark:[background:radial-gradient(60rem_30rem_at_50%_-10%,rgba(244,244,245,0.12),transparent_60%),linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0.6))]" />
      <main className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Naming Copilot
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            输入中文释义，生成专业英文程序命名。
          </p>
        </header>

        <NamingTool />
      </main>
    </div>
  )
}
