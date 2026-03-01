"use client"

import { useState } from "react"
import { cn } from "@/app/lib/utils"
import { MealImagePlaceholder } from "@/app/components/MealImagePlaceholder"

type MealImageProps = {
  src: string | null | undefined
  alt?: string
  className?: string
}

/**
 * 食事画像を表示。src が無い・読み込み失敗時はプレースホルダーを表示。
 * public/meals/ に 1.jpg, 2.jpg... を置くと表示されます。
 */
export function MealImage({ src, alt = "", className }: MealImageProps) {
  const [failed, setFailed] = useState(false)
  const hasValidSrc = src && !src.includes("placeholder") && !failed

  if (!hasValidSrc) {
    return <MealImagePlaceholder className={className} />
  }

  return (
    <img
      src={src!}
      alt={alt}
      className={cn("h-full w-full object-cover object-center", className)}
      onError={() => setFailed(true)}
    />
  )
}
