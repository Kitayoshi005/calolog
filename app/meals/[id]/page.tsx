import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"
import { Badge } from "@/app/components/ui/badge"
import { Separator } from "@/app/components/ui/separator"
import { MealImagePlaceholder } from "@/app/components/MealImagePlaceholder"
import Link from "next/link"

function hasMealPhoto(url: string | null | undefined): boolean {
  return !!url && !url.includes("placeholder")
}

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const meal = {
    id,
    time: "昼食 - 12:15",
    date: "2024年5月9日",
    name: "鶏むね肉のサラダ",
    description: "グリルした鶏むね肉とミックスリーフのサラダ、ドレッシングは別添え",
    calories: 450,
    protein: 35,
    fat: 12,
    carbs: 45,
    imageUrl: "/placeholder.svg?height=300&width=500",
    ingredients: [
      { name: "鶏むね肉", amount: "150g", calories: 165, protein: 31, fat: 3.5, carbs: 0 },
      { name: "ミックスリーフ", amount: "100g", calories: 25, protein: 2, fat: 0.5, carbs: 5 },
      { name: "トマト", amount: "80g", calories: 15, protein: 0.5, fat: 0.2, carbs: 3 },
      { name: "アボカド", amount: "50g", calories: 80, protein: 1, fat: 7.5, carbs: 4 },
      { name: "オリーブオイル", amount: "小さじ1", calories: 45, protein: 0, fat: 5, carbs: 0 },
      { name: "バルサミコ酢", amount: "小さじ2", calories: 10, protein: 0, fat: 0, carbs: 2 },
      { name: "塩こしょう", amount: "少々", calories: 0, protein: 0, fat: 0, carbs: 0 },
    ],
    additionalNutrients: [
      { name: "食物繊維", amount: "5g", percentage: 20 },
      { name: "ナトリウム", amount: "350mg", percentage: 15 },
      { name: "カリウム", amount: "550mg", percentage: 28 },
      { name: "カルシウム", amount: "45mg", percentage: 5 },
      { name: "鉄分", amount: "2.5mg", percentage: 14 },
      { name: "ビタミンA", amount: "120μg", percentage: 15 },
      { name: "ビタミンC", amount: "35mg", percentage: 35 },
    ],
    tags: ["高タンパク", "低脂質", "サラダ", "鶏肉"],
  }

  const proteinCalories = meal.protein * 4
  const fatCalories = meal.fat * 9
  const carbsCalories = meal.carbs * 4
  const proteinPercentage = Math.round((proteinCalories / meal.calories) * 100)
  const fatPercentage = Math.round((fatCalories / meal.calories) * 100)
  const carbsPercentage = Math.round((carbsCalories / meal.calories) * 100)

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-md px-4 pb-24">
        {/* ヘッダー */}
        <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-[var(--border)] bg-[var(--background)] py-4">
          <Link href="/" aria-label="戻る">
            <Button variant="ghost" size="icon" className="mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="flex-1 text-lg font-semibold tracking-tight">食事詳細</h1>
          <Button variant="ghost" size="icon" aria-label="編集">
            <Edit className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-red-500" aria-label="削除">
            <Trash2 className="h-5 w-5" />
          </Button>
        </header>

        {/* 食事画像 */}
        <div className="relative mb-6 h-56 w-full overflow-hidden rounded-xl bg-[var(--muted)]">
          {hasMealPhoto(meal.imageUrl) ? (
            <img
              src={meal.imageUrl!}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <MealImagePlaceholder className="h-full w-full rounded-xl" />
          )}
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 bg-[var(--card)]/90 backdrop-blur-sm"
          >
            {meal.time}
          </Badge>
        </div>

        {/* 基本情報 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight">{meal.name}</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{meal.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {meal.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-[var(--border)] text-[var(--muted-foreground)]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* カロリー・PFC */}
        <Card className="mb-6">
          <CardContent className="p-5">
            <div className="mb-4 text-center">
              <div className="text-3xl font-semibold tabular-nums tracking-tight">
                {meal.calories}
                <span className="ml-1 text-lg font-normal text-[var(--muted-foreground)]">kcal</span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">総カロリー</p>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-emerald-600">{meal.protein}g</div>
                <div className="text-xs text-[var(--muted-foreground)]">タンパク質</div>
                <div className="text-xs">{proteinPercentage}%</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-amber-600">{meal.fat}g</div>
                <div className="text-xs text-[var(--muted-foreground)]">脂質</div>
                <div className="text-xs">{fatPercentage}%</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-sky-600">{meal.carbs}g</div>
                <div className="text-xs text-[var(--muted-foreground)]">炭水化物</div>
                <div className="text-xs">{carbsPercentage}%</div>
              </div>
            </div>

            <div className="flex h-3 overflow-hidden rounded-full">
              <div className="bg-emerald-500" style={{ width: `${proteinPercentage}%` }} />
              <div className="bg-amber-500" style={{ width: `${fatPercentage}%` }} />
              <div className="bg-sky-500" style={{ width: `${carbsPercentage}%` }} />
            </div>
            <div className="mt-1.5 flex justify-between text-xs text-[var(--muted-foreground)]">
              <span>P: {proteinPercentage}%</span>
              <span>F: {fatPercentage}%</span>
              <span>C: {carbsPercentage}%</span>
            </div>
          </CardContent>
        </Card>

        {/* 食材リスト */}
        <section className="mb-6">
          <h3 className="mb-3 text-base font-semibold">食材リスト</h3>
          <Card>
            <CardContent className="p-5">
              <div className="space-y-4">
                {meal.ingredients.map((ingredient, index) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <span className="font-medium">{ingredient.name}</span>
                      <span className="text-sm text-[var(--muted-foreground)]">{ingredient.amount}</span>
                    </div>
                    <div className="mt-0.5 flex justify-between text-xs text-[var(--muted-foreground)]">
                      <span>{ingredient.calories} kcal</span>
                      <span>
                        P:{ingredient.protein}g F:{ingredient.fat}g C:{ingredient.carbs}g
                      </span>
                    </div>
                    {index < meal.ingredients.length - 1 && (
                      <Separator className="my-3 border-[var(--border)]" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* その他の栄養素 */}
        <section className="mb-6">
          <h3 className="mb-3 text-base font-semibold">その他の栄養素</h3>
          <Card>
            <CardContent className="p-5">
              <div className="grid grid-cols-2 gap-4">
                {meal.additionalNutrients.map((nutrient, index) => (
                  <div key={index}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium">{nutrient.name}</span>
                      <span>{nutrient.amount}</span>
                    </div>
                    <Progress
                      value={nutrient.percentage}
                      className="h-1.5"
                      indicatorColor={
                        index % 3 === 0
                          ? "bg-purple-500"
                          : index % 3 === 1
                            ? "bg-teal-500"
                            : "bg-orange-500"
                      }
                    />
                    <p className="mt-0.5 text-right text-xs text-[var(--muted-foreground)]">
                      {nutrient.percentage}%
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* アクション */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center border-t border-[var(--border)] bg-[var(--background)]/90 py-4 backdrop-blur-sm">
          <Button className="bg-[var(--primary)] px-8 text-[var(--primary-foreground)]">
            マイフードに追加
          </Button>
        </div>
      </div>
    </main>
  )
}
