import { OpenAIResponse, NutritionAnalysis } from '../types/openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function analyzeMealImage(imageUrl: string): Promise<NutritionAnalysis> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not set');
  }

  const prompt = `
    以下の食事画像を分析し、含まれる食品とその栄養素を推定してください。
    画像URL: ${imageUrl}
    
    以下のJSON形式で回答してください：
    {
      "food_items": [
        {
          "name": "食品名",
          "quantity": "量",
          "calories": カロリー,
          "protein": タンパク質(g),
          "fat": 脂質(g),
          "carbs": 炭水化物(g)
        }
      ],
      "total": {
        "calories": 合計カロリー,
        "protein": 合計タンパク質(g),
        "fat": 合計脂質(g),
        "carbs": 合計炭水化物(g)
      }
    }
  `;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      return JSON.parse(content) as NutritionAnalysis;
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      throw new Error('Failed to parse nutrition analysis');
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
} 