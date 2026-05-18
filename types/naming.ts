export type NamingType =
  | "project"
  | "component"
  | "cssClass"
  | "variable"
  | "function"
  | "class"
  | "api"
  | "hook"

export type NamingStyle =
  | "frontend"
  | "react"
  | "vue"
  | "node"
  | "java"
  | "python"
  | "enterprise"
  | "concise"

export type NamingRequest = {
  type: NamingType
  description: string
  style: NamingStyle
}

export type NamingSuggestion = {
  name: string
  reason: string
  score: number
}

export type NamingResponse = {
  recommended: NamingSuggestion
  alternatives: NamingSuggestion[]
  explanation: string
  warnings?: string[]
}

