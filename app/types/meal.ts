export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type Meal = {
  id: string;
  meal_type: MealType;
  description: string;
  image_url: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  created_at: string;
};

export type MealFormData = Omit<Meal, 'id' | 'created_at'>;

export type NutritionInfo = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}; 