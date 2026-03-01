import { ArrowLeft } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { MealImage } from "@/app/components/MealImage"
import { getMeals } from "@/app/lib/meals-data"
import Link from "next/link"

export default function MealsListPage() {
  const meals = getMeals()

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-md px-4 pb-24 pt-6">
        {/* ヘッダー */}
        <header className="mb-6 flex items-center gap-2">
          <Link href="/" aria-label="戻る">
            <Button variant="ghost" size="icon" className="mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold tracking-tight">今日の食事</h1>
        </header>

        {/* 食事リスト */}
        <ul className="space-y-2">
          {meals.map((meal) => (
            <li key={meal.id}>
              <Link href={`/meals/${meal.id}`} className="block">
                <Card className="overflow-hidden transition-colors hover:bg-[var(--muted)]/50">
                  <div className="flex">
                    <div className="h-20 w-20 shrink-0 bg-[var(--muted)]">
                      <MealImage src={meal.imageUrl} className="h-full w-full" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
                      <p className="text-xs text-[var(--muted-foreground)]">{meal.time}</p>
                      <p className="font-medium truncate">{meal.name}</p>
                      <div className="mt-0.5 flex justify-between gap-2 text-sm text-[var(--muted-foreground)]">
                        <span>{meal.calories} kcal</span>
                        <span className="truncate">
                          P:{meal.protein}g F:{meal.fat}g C:{meal.carbs}g
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
