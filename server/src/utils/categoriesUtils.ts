import { Category } from "@prisma/client";
export const convertImageToBase64 = (category: Category) => {
  if (category.image) {
    return {
      ...category,
      image: `data:image/png;base64,${category.image.toString("base64")}`,
    };
  }
  return category;
};
