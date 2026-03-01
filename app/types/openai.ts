export type OpenAIResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type NutritionAnalysis = {
  food_items: {
    name: string;
    quantity: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  }[];
  total: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}; 