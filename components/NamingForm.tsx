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
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-zinc-200/70 bg-zinc-50 dark:border-zinc-800/70 dark:bg-zinc-950">
        <CardTitle>输入</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="space-y-2">
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            命名类型
          </div>
          <Select value={props.type} onValueChange={(v) => props.onTypeChange(v as NamingType)}>
            <SelectTrigger>
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
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            中文释义
          </div>
          <Textarea
            value={props.description}
            onChange={(e) => props.onDescriptionChange(e.target.value)}
            placeholder="例如：用户个人资料卡片 / 获取订单列表 / 是否已经登录"
          />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            技术风格
          </div>
          <Select
            value={props.style}
            onValueChange={(v) => props.onStyleChange(v as NamingStyle)}
          >
            <SelectTrigger>
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
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-800/60 dark:bg-rose-950/30 dark:text-rose-200">
            {props.error}
          </div>
        ) : null}

        <Button type="button" onClick={props.onGenerate} disabled={props.loading}>
          {props.loading ? "生成中…" : "生成命名"}
        </Button>
      </CardContent>
    </Card>
  )
}

