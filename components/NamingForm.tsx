"use client"

import type { NamingStyle, NamingType } from "@/types/naming"
import { namingStyles, namingTypes } from "@/lib/naming-options"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export type NamingFormProps = {
  type: NamingType
  style: NamingStyle
  description: string
  onTypeChange: (v: NamingType) => void
  onStyleChange: (v: NamingStyle) => void
  onDescriptionChange: (v: string) => void
  onGenerate: () => void
  loading: boolean
  error: string | null
}

export function NamingForm(props: NamingFormProps) {
  return (
    <Card className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800/50 dark:bg-zinc-900/20">
        <CardTitle className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          输入配置
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            命名类型
          </div>
          <Select value={props.type} onValueChange={(v) => props.onTypeChange(v as NamingType)}>
            <SelectTrigger className="border-zinc-300 bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-100 dark:focus:ring-zinc-100">
              <SelectValue placeholder="选择命名类型" />
            </SelectTrigger>
            <SelectContent>
              {namingTypes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            中文释义
          </div>
          <Textarea
            className="min-h-[160px] resize-y border-zinc-300 bg-white p-3 text-sm leading-relaxed focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-visible:border-zinc-100 dark:focus-visible:ring-zinc-100"
            value={props.description}
            onChange={(e) => props.onDescriptionChange(e.target.value)}
            placeholder="例如：用户个人资料卡片 / 获取订单列表 / 是否已经登录"
          />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            技术风格
          </div>
          <Select
            value={props.style}
            onValueChange={(v) => props.onStyleChange(v as NamingStyle)}
          >
            <SelectTrigger className="border-zinc-300 bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-100 dark:focus:ring-zinc-100">
              <SelectValue placeholder="选择技术风格" />
            </SelectTrigger>
            <SelectContent>
              {namingStyles.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {props.error ? (
          <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-200">
            {props.error}
          </div>
        ) : null}

        <Button 
          type="button" 
          onClick={props.onGenerate} 
          disabled={props.loading}
          className="w-full bg-zinc-900 font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {props.loading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              正在生成...
            </span>
          ) : (
            "生成命名"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

