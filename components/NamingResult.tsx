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
    <div className="flex items-start justify-between gap-4 rounded border border-zinc-200 bg-zinc-50/50 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="break-all font-mono text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {item.name}
          </div>
          <Badge variant={tag.variant} className="rounded-sm font-normal">{tag.text}</Badge>
          <div className="text-xs text-zinc-500">Score {item.score}/10</div>
        </div>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {item.reason}
        </div>
      </div>
      <div className="shrink-0">
        <CopyButton value={item.name} />
      </div>
    </div>
  )
}

export function NamingResult({ result }: { result: NamingResponse }) {
  return (
    <Card className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800/50 dark:bg-zinc-900/20">
        <CardTitle className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          生成结果
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <div className="space-y-4">
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            最佳推荐
          </div>
          <div className="rounded border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="break-all font-mono text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-100">
                    {result.recommended.name}
                  </div>
                  <Badge variant={scoreLabel(result.recommended.score).variant} className="rounded-sm bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400">
                    {scoreLabel(result.recommended.score).text}
                  </Badge>
                  <div className="text-xs text-zinc-500">
                    Score {result.recommended.score}/10
                  </div>
                </div>
                <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {result.recommended.reason}
                </div>
              </div>
              <div className="shrink-0">
                <CopyButton value={result.recommended.name} />
              </div>
            </div>
          </div>
          {result.explanation ? (
            <div className="rounded bg-zinc-50 p-4 text-sm text-zinc-600 dark:bg-zinc-900/50 dark:text-zinc-400">
              {result.explanation}
            </div>
          ) : null}
          {result.warnings?.length ? (
            <div className="rounded border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-200">
              <div className="font-medium">提示</div>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {result.warnings.map((w, idx) => (
                  <li key={`${idx}-${w}`}>{w}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="space-y-4">
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            备选方案
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

