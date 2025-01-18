import { Request, Response } from "express";
import { client } from "../configs/configOpenAi";
import OpenAI from "openai";
import fs from "fs";

function encodeImage(imagePath: any) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString("base64");
}

export const getAiTest = async (req: Request, res: Response): Promise<void> => {
  const imagePath = "C:/projects/calAI/server/apple.jpg";
  const base64Image = encodeImage(imagePath);
  const imagePath2 = "C:/projects/calAI/server/apple2.jpg";
  const base64Image2 = encodeImage(imagePath2);
  //   const params: OpenAI.Chat.ChatCompletionCreateParams = {
  //     messages: [{ role: "user", content: "what is the capital of israel" }],
  //     model: "gpt-4o",
  //   };

  const promtText = `
  I need you to estimate the number of calories in the food shown in the image. 
  Please keep the following instructions in mind:
  
  1. Identify the food items in the image. What type of food is it (e.g., vegetables, fruits, grains, meat, etc.)? If there are multiple items, describe each one.
  2. Estimate the portion size based on the image. Try to calculate the approximate serving size of each food item.
  3. For each food item identified, provide an approximate calorie count based on typical serving sizes. Please be as specific as possible. If the dish includes ingredients like hummus, falafel, or shawarma, consider how these foods are typically prepared in Israel.
  4. Since I am from Israel, please account for local cuisine, traditional recipes, and common portion sizes when making your estimate.
  
  Please provide the most accurate estimate you can based on the visual content, typical nutritional information, and your knowledge of food.
  `;
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: promtText,
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
  //   const chatCompletion: OpenAI.Chat.ChatCompletion =
  //     await client.chat.completions.create(params);
  res.status(200).json({ message: response.choices[0].message.content });
};
