"use client"

import { cn } from "@/app/lib/utils"

/** 食事写真がまだないときに表示するプレースホルダーイラスト */
export function MealImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center bg-[var(--muted)]", className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[70%] max-h-32 w-[70%] max-w-32 text-[var(--muted-foreground)]"
      >
        {/* お皿 */}
        <ellipse
          cx="60"
          cy="68"
          rx="42"
          ry="14"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeOpacity="0.4"
          fill="none"
        />
        <path
          d="M22 68c0-21 17-38 38-38s38 17 38 38"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeOpacity="0.5"
          fill="none"
        />
        {/* フォーク */}
        <path
          d="M38 24v44M35 24h6M34 32h8M33 40h10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
        {/* ナイフ */}
        <path
          d="M82 24v44M80 24h4M79 32h6M78 40h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
        {/* 中央の小さなアイコン（食べ物のモチーフ） */}
        <circle cx="60" cy="58" r="8" fill="currentColor" fillOpacity="0.15" />
        <circle cx="60" cy="58" r="4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
      </svg>
    </div>
  )
}
