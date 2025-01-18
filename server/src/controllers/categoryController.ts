// import { Request, Response } from "express";
// import { convertImageToBase64 } from "../utils/categoriesUtils";

// export const getCategories = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { id } = req.params;
//   const { all, name } = req.query;
//   try {
//     let result;
//     if (id) {
//       result = await prismaClient.category.findUnique({
//         where: { id: Number(id) },
//       });
//       if (!result) {
//         res.status(404).json({ message: "Category not found" });
//         return;
//       }
//       result = convertImageToBase64(result);
//     } else if (name) {
//       result = await prismaClient.category.findMany({
//         where: {
//           name: {
//             contains: name as string,
//             mode: "insensitive",
//           },
//         },
//       });
//       result = result.map(convertImageToBase64);
//     } else {
//       result = await prismaClient.category.findMany();
//       result = result.map(convertImageToBase64);
//     }

//     res.status(200).json(result || []);
//   } catch (error) {
//     console.error("Error in getCategories:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const createCategory = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { name, description, image } = req.body;
//   if (!name || !description || !image) {
//     res.status(400).json({ message: "Missing required fields" });
//     return;
//   }
//   try {
//     const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
//     const result = await prismaClient.category.create({
//       data: {
//         name,
//         description: description,
//         image: base64Data,
//       },
//     });
//     if (!result) res.status(404).json({ message: "Category not created" });
//     else res.status(201).json({ message: "Category created" });
//   } catch (error) {
//     console.error("Error in createCategory:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const updateCategory = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { id } = req.params;
//   const { name, description, image } = req.body;
//   if (!name || !description || !image) {
//     res.status(400).json({ message: "Missing required fields" });
//     return;
//   }
//   try {
//     const result = await prismaClient.category.update({
//       where: { id: Number(id) },
//       data: {
//         name,
//         description: description,
//         image: image,
//       },
//     });
//     if (!result) res.status(404).json({ message: "Category not updated" });
//     else res.status(200).json(result);
//   } catch (error) {
//     console.error("Error in updateCategory:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const deleteCategory = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { id } = req.params;
//   try {
//     const result = await prismaClient.category.delete({
//       where: { id: Number(id) },
//     });
//     if (!result) res.status(404).json({ message: "Category not deleted" });
//     else res.status(200).json({ message: "Category deleted" });
//   } catch (error) {
//     console.error("Error in deleteCategory:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
