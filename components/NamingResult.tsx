"use client"

import type { NamingResponse, NamingSuggestion } from "@/types/naming"
import { CopyButton } from "@/components/CopyButton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function scoreLabel(score: number) {
  if (score >= 9) return { text: "强烈推荐", variant: "default" as const }
  if (score >= 7) return { text: "可选", variant: "secondary" as const }
  return { text: "谨慎使用", variant: "outline" as const }
}

function SuggestionRow({ item }: { item: NamingSuggestion }) {
  const tag = scoreLabel(item.score)
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-zinc-200/70 p-4 dark:border-zinc-800/70">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <div className="font-mono text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {item.name}
          </div>
          <Badge variant={tag.variant}>{tag.text}</Badge>
          <div className="text-xs text-zinc-500">Score {item.score}/10</div>
        </div>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          {item.reason}
        </div>
      </div>
      <CopyButton value={item.name} />
    </div>
  )
}

export function NamingResult({ result }: { result: NamingResponse }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-zinc-200/70 bg-zinc-50 dark:border-zinc-800/70 dark:bg-zinc-950">
        <CardTitle>结果</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-3">
          <div className="text-xs font-medium tracking-wide text-zinc-500">
            推荐命名
          </div>
          <div className="rounded-xl border border-zinc-200/70 bg-white p-5 dark:border-zinc-800/70 dark:bg-zinc-950">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-mono text-2xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
                    {result.recommended.name}
                  </div>
                  <Badge variant={scoreLabel(result.recommended.score).variant}>
                    {scoreLabel(result.recommended.score).text}
                  </Badge>
                  <div className="text-xs text-zinc-500">
                    Score {result.recommended.score}/10
                  </div>
                </div>
                <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                  {result.recommended.reason}
                </div>
              </div>
              <CopyButton value={result.recommended.name} />
            </div>
          </div>
          {result.explanation ? (
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              {result.explanation}
            </div>
          ) : null}
          {result.warnings?.length ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-200">
              <div className="font-medium">提示</div>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {result.warnings.map((w, idx) => (
                  <li key={`${idx}-${w}`}>{w}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="space-y-3">
          <div className="text-xs font-medium tracking-wide text-zinc-500">
            备选命名
          </div>
          <div className="space-y-3">
            {result.alternatives.map((alt) => (
              <SuggestionRow key={alt.name} item={alt} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

