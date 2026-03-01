import { Plus, Camera, Edit, ChevronRight, Settings } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Progress } from "@/app/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { MealImage } from "@/app/components/MealImage"
import { getMeals } from "@/app/lib/meals-data"
import Link from "next/link"

export default function Home() {
  const meals = getMeals()
  const userData = {
    name: "山田太郎",
    targetCalories: 2200,
    currentCalories: 1450,
    protein: { target: 150, current: 95 },
    fat: { target: 70, current: 45 },
    carbs: { target: 220, current: 180 },
    meals,
  }

  const calorieProgress = Math.round((userData.currentCalories / userData.targetCalories) * 100)
  const proteinProgress = Math.round((userData.protein.current / userData.protein.target) * 100)
  const fatProgress = Math.round((userData.fat.current / userData.fat.target) * 100)
  const carbsProgress = Math.round((userData.carbs.current / userData.carbs.target) * 100)

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-md px-4 pb-24 pt-6">
        {/* ヘッダー */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-[var(--border)]">
              <AvatarImage src="/placeholder.svg" alt="プロフィール" />
              <AvatarFallback className="text-sm font-medium">YT</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">{userData.name}</h1>
              <p className="text-sm text-[var(--muted-foreground)]">2024年5月9日</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" aria-label="設定">
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        {/* カロリーカード */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-[var(--muted-foreground)]">今日の摂取カロリー</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-3xl font-semibold tabular-nums tracking-tight">
                {userData.currentCalories}
                <span className="ml-1 text-lg font-normal text-[var(--muted-foreground)]">kcal</span>
              </span>
              <span className="text-sm text-[var(--muted-foreground)]">
                目標 {userData.targetCalories} kcal
              </span>
            </div>
            <Progress value={calorieProgress} className="h-2.5" />
            <p className="text-right text-sm text-[var(--muted-foreground)]">
              残り {userData.targetCalories - userData.currentCalories} kcal
            </p>
          </CardContent>
        </Card>

        {/* PFCタブ */}
        <Tabs defaultValue="nutrition" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="nutrition">栄養バランス</TabsTrigger>
            <TabsTrigger value="chart">グラフ</TabsTrigger>
          </TabsList>
          <TabsContent value="nutrition" className="mt-4">
            <Card>
              <CardContent className="pt-5">
                <div className="space-y-5">
                  <div>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-medium">タンパク質</span>
                      <span className="text-[var(--muted-foreground)]">
                        {userData.protein.current}g / {userData.protein.target}g
                      </span>
                    </div>
                    <Progress value={proteinProgress} className="h-2" indicatorColor="bg-emerald-500" />
                  </div>
                  <div>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-medium">脂質</span>
                      <span className="text-[var(--muted-foreground)]">
                        {userData.fat.current}g / {userData.fat.target}g
                      </span>
                    </div>
                    <Progress value={fatProgress} className="h-2" indicatorColor="bg-amber-500" />
                  </div>
                  <div>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-medium">炭水化物</span>
                      <span className="text-[var(--muted-foreground)]">
                        {userData.carbs.current}g / {userData.carbs.target}g
                      </span>
                    </div>
                    <Progress value={carbsProgress} className="h-2" indicatorColor="bg-sky-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="chart" className="mt-4">
            <Card>
              <CardContent className="flex justify-center py-8">
                <div className="relative flex h-44 w-44 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[10px] border-[var(--muted)]" />
                  <div className="text-center">
                    <div className="text-2xl font-semibold tabular-nums">{userData.currentCalories}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">摂取カロリー</div>
                  </div>
                  <div className="absolute right-0 top-2 h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white shadow">
                    P
                  </div>
                  <div className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-xs font-bold text-white shadow">
                    F
                  </div>
                  <div className="absolute bottom-2 left-2 h-12 w-12 rounded-full bg-sky-500 flex items-center justify-center text-xs font-bold text-white shadow">
                    C
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 食事リスト */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">今日の食事</h2>
            <Link
              href="/meals"
              className="inline-flex h-8 items-center rounded-md px-3 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              すべて見る <ChevronRight className="ml-0.5 h-4 w-4" />
            </Link>
          </div>
          <ul className="space-y-2">
            {userData.meals.map((meal) => (
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
        </section>
      </div>

      {/* FAB */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-[var(--background)]/80 pb-6 pt-4 backdrop-blur-sm">
        <div className="flex gap-3">
          <Link href="/add-meal?tab=text">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-[var(--border)]"
              aria-label="テキストで記録"
            >
              <Edit className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/add-meal?tab=camera">
            <Button
              size="icon"
              className="h-14 w-14 rounded-full bg-[var(--primary)] shadow-md hover:opacity-90"
              aria-label="写真で記録"
            >
              <Camera className="h-6 w-6" />
            </Button>
          </Link>
          <Link href="/add-meal?tab=manual">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-[var(--border)]"
              aria-label="手動で記録"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
