import { NamingTool } from "@/components/NamingTool"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 selection:bg-zinc-200 dark:bg-[#0a0a0a] dark:text-zinc-100 dark:selection:bg-zinc-800">
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
              <span className="font-mono text-sm font-bold">N</span>
            </div>
            <span className="text-sm font-semibold tracking-tight">Naming Copilot</span>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-8 animate-fade-in-up">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            代码命名生成器
          </h1>
          <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            遵循企业级规范，将中文业务语义转换为专业、统一的代码命名。
          </p>
        </header>

        <div className="animate-fade-in-up [animation-delay:100ms] opacity-0">
          <NamingTool />
        </div>
      </main>
    </div>
  )
}
