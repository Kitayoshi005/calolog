"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Camera, Search, Plus, X, Upload, Check } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/imput"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Card, CardContent } from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Textarea } from "@/app/components/ui/textarea"
import { Slider } from "@/app/components/ui/slider"
import { Progress } from "@/app/components/ui/progress"
import { MealImagePlaceholder } from "@/app/components/MealImagePlaceholder"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/app/lib/utils"

export default function AddMealPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "camera"      
  const [mealTime, setMealTime] = useState("breakfast")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFoods, setSelectedFoods] = useState<any[]>([])
  const [mealName, setMealName] = useState("")
  const [mealDescription, setMealDescription] = useState("")

  // 食品データベースのサンプル
  const foodDatabase = [
    { id: 1, name: "鶏むね肉", unit: "100g", calories: 110, protein: 23, fat: 1.5, carbs: 0 },
    { id: 2, name: "ブロッコリー", unit: "100g", calories: 34, protein: 2.8, fat: 0.4, carbs: 7 },
    { id: 3, name: "玄米", unit: "100g", calories: 165, protein: 3.5, fat: 1, carbs: 35 },
    { id: 4, name: "サーモン", unit: "100g", calories: 208, protein: 20, fat: 13, carbs: 0 },
    { id: 5, name: "アボカド", unit: "100g", calories: 160, protein: 2, fat: 15, carbs: 9 },
    { id: 6, name: "豆腐", unit: "100g", calories: 72, protein: 8, fat: 4, carbs: 2 },
    { id: 7, name: "卵", unit: "1個", calories: 77, protein: 6, fat: 5, carbs: 0.6 },
    { id: 8, name: "オートミール", unit: "100g", calories: 389, protein: 16.9, fat: 6.9, carbs: 66 },
    { id: 9, name: "バナナ", unit: "1本", calories: 89, protein: 1.1, fat: 0.3, carbs: 23 },
    { id: 10, name: "牛乳", unit: "200ml", calories: 138, protein: 6.8, fat: 7.8, carbs: 10 },
  ]

  // 検索結果
  const searchResults = searchQuery ? foodDatabase.filter((food) => food.name.includes(searchQuery)) : []

  // 写真アップロード処理
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 写真解析処理（モック）
  const analyzeImage = () => {
    setIsAnalyzing(true)
    // 実際のアプリではここでAI解析APIを呼び出す
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
      // 解析結果をセット（モック）
      setMealName("鶏むね肉のグリルサラダ")
      setSelectedFoods([
        { ...foodDatabase[0], quantity: 1.5 }, // 鶏むね肉 150g
        { ...foodDatabase[1], quantity: 1 }, // ブロッコリー 100g
        { ...foodDatabase[4], quantity: 0.5 }, // アボカド 50g
      ])
    }, 2000)
  }

  // 食品を選択リストに追加
  const addFoodToSelection = (food: any) => {
    const existingFood = selectedFoods.find((f) => f.id === food.id)
    if (existingFood) {
      setSelectedFoods(selectedFoods.map((f) => (f.id === food.id ? { ...f, quantity: f.quantity + 0.5 } : f)))
    } else {
      setSelectedFoods([...selectedFoods, { ...food, quantity: 1 }])
    }
    setSearchQuery("")
  }

  // 食品の量を変更
  const updateFoodQuantity = (id: number, quantity: number) => {
    setSelectedFoods(selectedFoods.map((food) => (food.id === id ? { ...food, quantity } : food)))
  }

  // 食品を削除
  const removeFood = (id: number) => {
    setSelectedFoods(selectedFoods.filter((food) => food.id !== id))
  }

  // 栄養素合計を計算
  const calculateTotals = () => {
    return selectedFoods.reduce(
      (totals, food) => {
        totals.calories += food.calories * food.quantity
        totals.protein += food.protein * food.quantity
        totals.fat += food.fat * food.quantity
        totals.carbs += food.carbs * food.quantity
        return totals
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0 },
    )
  }

  const totals = calculateTotals()

  // 食事を保存
  const saveMeal = () => {
    // 実際のアプリではここでデータベースに保存
    console.log({
      name: mealName,
      description: mealDescription,
      mealTime,
      foods: selectedFoods,
      totals,
      image: imagePreview,
    })

    // ホーム画面に戻る
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-md px-4 pb-20">
        {/* ヘッダー */}
        <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-[var(--border)] bg-[var(--background)] py-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-1" aria-label="戻る">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="flex-1 text-lg font-semibold tracking-tight">食事を記録</h1>
          <Button
            onClick={saveMeal}
            disabled={selectedFoods.length === 0 || !mealName}
            className="bg-[var(--primary)] text-[var(--primary-foreground)]"
          >
            保存
          </Button>
        </header>

      {/* 食事時間選択 */}
      <section className="mb-6">
        <p className="mb-2 text-sm font-medium text-[var(--muted-foreground)]">食事の時間</p>
        <RadioGroup value={mealTime} onValueChange={setMealTime} className="grid grid-cols-4 gap-2">
          <Label
            htmlFor="breakfast"
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 py-3 text-xs font-medium transition-colors",
              mealTime === "breakfast"
                ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--muted-foreground)]/30",
            )}
          >
            <RadioGroupItem value="breakfast" id="breakfast" className="sr-only" />
            朝食
          </Label>
          <Label
            htmlFor="lunch"
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 py-3 text-xs font-medium transition-colors",
              mealTime === "lunch"
                ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--muted-foreground)]/30",
            )}
          >
            <RadioGroupItem value="lunch" id="lunch" className="sr-only" />
            昼食
          </Label>
          <Label
            htmlFor="dinner"
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 py-3 text-xs font-medium transition-colors",
              mealTime === "dinner"
                ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--muted-foreground)]/30",
            )}
          >
            <RadioGroupItem value="dinner" id="dinner" className="sr-only" />
            夕食
          </Label>
          <Label
            htmlFor="snack"
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 py-3 text-xs font-medium transition-colors",
              mealTime === "snack"
                ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--muted-foreground)]/30",
            )}
          >
            <RadioGroupItem value="snack" id="snack" className="sr-only" />
            間食
          </Label>
        </RadioGroup>
      </section>

      {/* 入力方法タブ */}
      <Tabs defaultValue={initialTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="camera">
            <Camera className="mr-2 h-4 w-4" />
            写真
          </TabsTrigger>
          <TabsTrigger value="text">
            <Search className="mr-2 h-4 w-4" />
            検索
          </TabsTrigger>
          <TabsTrigger value="manual">
            <Plus className="mr-2 h-4 w-4" />
            手動
          </TabsTrigger>
        </TabsList>

        {/* 写真タブ */}
        <TabsContent value="camera" className="mt-4">
          {!imagePreview ? (
            <div className="flex flex-col items-center">
              <div className="relative mb-4 flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-[var(--muted)]">
                <MealImagePlaceholder className="absolute inset-0 opacity-60" />
                <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                  <Camera className="h-10 w-10 text-[var(--muted-foreground)]" />
                  <p className="text-sm text-[var(--muted-foreground)]">写真を撮影またはアップロード</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Camera className="mr-2 h-4 w-4" />
                  撮影する
                </Button>
                <label htmlFor="image-upload" className="flex-1">
                  <Button className="w-full bg-[var(--primary)] text-[var(--primary-foreground)]">
                    <Upload className="mr-2 h-4 w-4" />
                    アップロード
                  </Button>
                </label>
                <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl bg-[var(--muted)]">
                <img src={imagePreview || "/placeholder.svg"} alt="食事の写真" className="h-full w-full object-cover" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 rounded-full bg-[var(--card)]/90 backdrop-blur"
                  onClick={() => {
                    setImagePreview(null)
                    setAnalysisComplete(false)
                  }}
                  aria-label="写真を削除"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {!isAnalyzing && !analysisComplete ? (
                <Button className="w-full bg-[var(--primary)] text-[var(--primary-foreground)]" onClick={analyzeImage}>
                  写真を解析する
                </Button>
              ) : isAnalyzing ? (
                <div className="text-center">
                  <div className="mb-2 flex flex-col items-center">
                    <div className="mb-2 h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)]" />
                    <p className="text-sm text-[var(--muted-foreground)]">写真を解析中...</p>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              ) : (
                <div className="mb-4 flex items-center justify-center text-emerald-600">
                  <Check className="mr-2 h-5 w-5" />
                  <span className="text-sm font-medium">解析完了</span>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* 検索タブ */}
        <TabsContent value="text" className="mt-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <Input
                type="search"
                placeholder="食品名を検索..."
                className="h-11 rounded-lg border-[var(--border)] bg-[var(--card)] pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {searchQuery && (
              <Card>
                <CardContent className="p-2">
                  <div className="max-h-48 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      <div className="space-y-0.5">
                        {searchResults.map((food) => (
                          <button
                            type="button"
                            key={food.id}
                            className="flex w-full justify-between items-center rounded-lg p-2.5 text-left transition-colors hover:bg-[var(--muted)]"
                            onClick={() => addFoodToSelection(food)}
                          >
                            <div>
                              <div className="font-medium">{food.name}</div>
                              <div className="text-xs text-[var(--muted-foreground)]">
                                {food.calories}kcal / {food.unit}
                              </div>
                            </div>
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
                              <Plus className="h-4 w-4" />
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-sm text-[var(--muted-foreground)]">
                        該当する食品が見つかりません
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* 手動入力タブ */}
        <TabsContent value="manual" className="mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="manual-food" className="text-[var(--muted-foreground)]">食品名</Label>
              <div className="mt-1.5 flex gap-2">
                <Input
                  id="manual-food"
                  placeholder="例: 鶏むね肉 150g"
                  className="h-11 flex-1 rounded-lg border-[var(--border)] bg-[var(--card)]"
                />
                <Button className="bg-[var(--primary)] text-[var(--primary-foreground)]">追加</Button>
              </div>
            </div>
            <div>
              <Label className="text-[var(--muted-foreground)]">または一般的な食品から選択</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {foodDatabase.slice(0, 6).map((food) => (
                  <Button
                    key={food.id}
                    type="button"
                    variant="outline"
                    className="h-auto justify-start rounded-lg border-[var(--border)] py-2.5 text-left"
                    onClick={() => addFoodToSelection(food)}
                  >
                    <div>
                      <div className="font-medium">{food.name}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{food.calories}kcal</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* 選択された食品リスト */}
      {selectedFoods.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-base font-semibold">選択された食品</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {selectedFoods.map((food) => (
                  <div
                    key={food.id}
                    className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                  >
                    <div className="mb-1.5 flex justify-between items-center">
                      <div className="font-medium">{food.name}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[var(--muted-foreground)]"
                        onClick={() => removeFood(food.id)}
                        aria-label="削除"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <Slider
                          value={[food.quantity * 100]}
                          min={50}
                          max={500}
                          step={50}
                          onValueChange={(value) => updateFoodQuantity(food.id, value[0] / 100)}
                        />
                      </div>
                      <span className="w-14 shrink-0 text-right text-sm tabular-nums">{food.quantity * 100}g</span>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-[var(--muted-foreground)]">
                      <span>{Math.round(food.calories * food.quantity)} kcal</span>
                      <span>
                        P:{Math.round(food.protein * food.quantity)}g F:{Math.round(food.fat * food.quantity)}g
                        C:{Math.round(food.carbs * food.quantity)}g
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* 栄養素合計 */}
      {selectedFoods.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-base font-semibold">栄養素合計</h2>
          <Card>
            <CardContent className="p-5">
              <div className="mb-4 text-center">
                <div className="text-3xl font-semibold tabular-nums tracking-tight">
                  {Math.round(totals.calories)}
                  <span className="ml-1 text-lg font-normal text-[var(--muted-foreground)]">kcal</span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">総カロリー</p>
              </div>

              <div className="mb-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-emerald-600">{Math.round(totals.protein)}g</div>
                  <div className="text-xs text-[var(--muted-foreground)]">タンパク質</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-amber-600">{Math.round(totals.fat)}g</div>
                  <div className="text-xs text-[var(--muted-foreground)]">脂質</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-sky-600">{Math.round(totals.carbs)}g</div>
                  <div className="text-xs text-[var(--muted-foreground)]">炭水化物</div>
                </div>
              </div>

              <div className="flex h-3 overflow-hidden rounded-full">
                <div
                  className="bg-emerald-500 transition-[width]"
                  style={{ width: `${((totals.protein * 4) / totals.calories) * 100}%` }}
                />
                <div
                  className="bg-amber-500 transition-[width]"
                  style={{ width: `${((totals.fat * 9) / totals.calories) * 100}%` }}
                />
                <div
                  className="bg-sky-500 transition-[width]"
                  style={{ width: `${((totals.carbs * 4) / totals.calories) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* 食事名と説明 */}
      <section className="space-y-4">
        <div>
          <Label htmlFor="meal-name" className="text-[var(--muted-foreground)]">食事名</Label>
          <Input
            id="meal-name"
            placeholder="例: 鶏むね肉のサラダ"
            className="mt-1.5 h-11 rounded-lg border-[var(--border)] bg-[var(--card)]"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="meal-description" className="text-[var(--muted-foreground)]">メモ（任意）</Label>
          <Textarea
            id="meal-description"
            placeholder="メモを入力..."
            className="mt-1.5 min-h-[88px] rounded-lg border-[var(--border)] bg-[var(--card)]"
            value={mealDescription}
            onChange={(e) => setMealDescription(e.target.value)}
          />
        </div>
      </section>
    </div>
    </main>
  )
}
