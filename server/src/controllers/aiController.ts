import { Request, Response } from "express";
import { client } from "../configs/configOpenAi";
import fs from "fs";

function encodeImage(imagePath: any) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString("base64");
}

export const getAiTest = async (req: Request, res: Response): Promise<void> => {
  const imagePath =
    "C:/Users/yotam/OneDrive/Documents/Git-Files/calAI/server/rice.jpg";
  const base64Image = encodeImage(imagePath);

  const newTextPrompt = `Please analyze the food items visible in the provided image. The user is from Israel, so consider common foods from the region when identifying the items. Follow these steps:

1. **Identify the food items**: Clearly list each distinct food item visible in the image.  
2. **Estimate portion size**: Based on the image, estimate the weight of each food item in grams. Use common serving sizes and visual cues for accuracy.  
3. **Calculate nutritional values**: Provide approximate calorie counts and macronutrient breakdown (carbohydrates, proteins, fats) for each food item based on the estimated portion size.  
4. **Provide a total summary**: Include a total for the calories and macronutrients if multiple items are present.

Ensure your response is detailed, clear, and formatted for easy understanding.
i want you to return me a json object with the following structure:
  {
    "calories": number,
    "foodItems": [
      {
        "name": string,
        "calories": number,
        "weight": number (in grams),
        "weightText": string (100 grams )
      },
      {
        "name": string,
        "calories": number,
        "weight": number (in grams),
        "weightText": string (100 grams )
      }
    ]
  }
    and make it a parse able json with a js format with no additional text.
`;

  const changeText = `i have this object {'calories':130,'foodItems':[{'name':'White Rice','calories':130,'weight':100,'weightText':'100 grams'}]}} and i want to change from 100grams to 300 grams give me the updated values with the same format 
            i want you to return me a json object with the following structure:
  {
    "calories": number,
    "foodItems": [
      {
        "name": string,
        "calories": number,
        "weight": number (in grams),
        "protein": number,
        "weightText": string (100 grams )
      },
      {
        "name": string,
        "calories": number,
        "weight": number (in grams),
        "protein": number,
        "weightText": string (100 grams )
      }
    ]
  }
    and make it a parse able json with a js format with no additional text.
            
            `;
  const response = await client.chat.completions.create({
    model: "chatgpt-4o-latest",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: newTextPrompt,
          },

          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
  });
  //@ts-ignore
  const jsonString = response.choices[0].message.content.replace(
    /```json\n|\n```/g,
    ""
  );

  const parsedJson = JSON.parse(jsonString);
  res.status(200).json({ message: parsedJson });
};
