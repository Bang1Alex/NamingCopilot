"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="复制"
      onClick={onCopy}
      className="h-9 w-9"
    >
      {copied ? <Check className="text-emerald-600" /> : <Copy />}
    </Button>
  )
}

