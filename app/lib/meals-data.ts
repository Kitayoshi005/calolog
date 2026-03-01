/**
 * 食事詳細ページ用の型・サンプルデータ
 * 本来はDBやAPIから取得する想定
 */

export type MealIngredient = {
  name: string
  amount: string
  calories: number
  protein: number
  fat: number
  carbs: number
}

export type MealAdditionalNutrient = {
  name: string
  amount: string
  percentage: number
}

export type MealDetail = {
  id: string
  time: string
  date: string
  name: string
  description: string
  calories: number
  protein: number
  fat: number
  carbs: number
  imageUrl: string | null
  ingredients: MealIngredient[]
  additionalNutrients: MealAdditionalNutrient[]
  tags: string[]
}

const mealsData: Record<string, MealDetail> = {
  "1": {
    id: "1",
    time: "朝食 - 7:30",
    date: "2024年5月9日",
    name: "オートミールとフルーツ",
    description: "プレーンオートミールにバナナ・ベリー・はちみつをトッピング。食物繊維とビタミンが摂れる朝食です。",
    calories: 350,
    protein: 15,
    fat: 8,
    carbs: 55,
    imageUrl: "/meals/1.png",
    ingredients: [
      { name: "オートミール", amount: "50g", calories: 195, protein: 8.5, fat: 3.5, carbs: 33 },
      { name: "バナナ", amount: "1本", calories: 89, protein: 1.1, fat: 0.3, carbs: 23 },
      { name: "ミックスベリー", amount: "50g", calories: 29, protein: 0.4, fat: 0.2, carbs: 7 },
      { name: "はちみつ", amount: "大さじ1", calories: 61, protein: 0, fat: 0, carbs: 17 },
      { name: "牛乳", amount: "50ml", calories: 34, protein: 1.7, fat: 1.9, carbs: 2.5 },
    ],
    additionalNutrients: [
      { name: "食物繊維", amount: "6g", percentage: 24 },
      { name: "ナトリウム", amount: "120mg", percentage: 5 },
      { name: "カリウム", amount: "420mg", percentage: 21 },
      { name: "カルシウム", amount: "85mg", percentage: 9 },
      { name: "鉄分", amount: "1.8mg", percentage: 10 },
      { name: "ビタミンC", amount: "12mg", percentage: 12 },
    ],
    tags: ["朝食", "食物繊維", "オートミール", "フルーツ"],
  },
  "2": {
    id: "2",
    time: "昼食 - 12:15",
    date: "2024年5月9日",
    name: "鶏むね肉のサラダ",
    description: "グリルした鶏むね肉とミックスリーフのサラダ、ドレッシングは別添え",
    calories: 450,
    protein: 35,
    fat: 12,
    carbs: 45,
    imageUrl: "/meals/2.png",
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
  },
  "3": {
    id: "3",
    time: "間食 - 15:30",
    date: "2024年5月9日",
    name: "プロテインシェイク",
    description: "ホエイプロテインを牛乳で溶かしたシェイク。トレーニング後のタンパク質補給に。",
    calories: 150,
    protein: 25,
    fat: 3,
    carbs: 5,
    imageUrl: "/meals/3.png",
    ingredients: [
      { name: "ホエイプロテイン", amount: "1スクープ(30g)", calories: 120, protein: 24, fat: 1.5, carbs: 3 },
      { name: "牛乳", amount: "150ml", calories: 97, protein: 5.1, fat: 5.9, carbs: 7.4 },
      { name: "氷", amount: "適量", calories: 0, protein: 0, fat: 0, carbs: 0 },
    ],
    additionalNutrients: [
      { name: "カルシウム", amount: "180mg", percentage: 18 },
      { name: "ナトリウム", amount: "95mg", percentage: 4 },
      { name: "カリウム", amount: "220mg", percentage: 11 },
    ],
    tags: ["間食", "高タンパク", "プロテイン", "シェイク"],
  },
  "4": {
    id: "4",
    time: "夕食 - 19:00",
    date: "2024年5月9日",
    name: "サーモンと野菜炒め",
    description: "焼いたサーモンと彩り野菜の炒め物。オメガ3と野菜を一度に摂れる一品。",
    calories: 500,
    protein: 40,
    fat: 22,
    carbs: 35,
    imageUrl: "/meals/4.png",
    ingredients: [
      { name: "サーモン", amount: "150g", calories: 312, protein: 30, fat: 19.5, carbs: 0 },
      { name: "ブロッコリー", amount: "80g", calories: 27, protein: 2.2, fat: 0.3, carbs: 5.6 },
      { name: "パプリカ", amount: "50g", calories: 15, protein: 0.7, fat: 0.1, carbs: 2.9 },
      { name: "にんじん", amount: "50g", calories: 21, protein: 0.5, fat: 0.1, carbs: 4.9 },
      { name: "しょうゆ", amount: "小さじ2", calories: 11, protein: 0.9, fat: 0, carbs: 1.4 },
      { name: "ごま油", amount: "小さじ1", calories: 40, protein: 0, fat: 4.5, carbs: 0 },
      { name: "にんにく", amount: "1片", calories: 4, protein: 0.2, fat: 0, carbs: 1 },
    ],
    additionalNutrients: [
      { name: "食物繊維", amount: "4g", percentage: 16 },
      { name: "オメガ3", amount: "2.5g", percentage: 0 },
      { name: "ナトリウム", amount: "480mg", percentage: 21 },
      { name: "カリウム", amount: "620mg", percentage: 31 },
      { name: "ビタミンD", amount: "18μg", percentage: 90 },
      { name: "ビタミンB12", amount: "4.5μg", percentage: 188 },
    ],
    tags: ["高タンパク", "オメガ3", "魚", "野菜"],
  },
}

export function getMealById(id: string): MealDetail | null {
  return mealsData[id] ?? null
}

/** 一覧用：今日の食事をID順で返す */
export function getMeals(): MealDetail[] {
  return ["1", "2", "3", "4"].map((id) => mealsData[id]).filter(Boolean)
}
