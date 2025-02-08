// api/foodApi.ts
import axios from "axios";

export interface Food {
  id: string;
  name: string;
  description: string;
  image?: string;
  calories: number;
}

export const fetchFoods = async (query: string): Promise<Food[]> => {
  const response = await axios.get(
    "https://world.openfoodfacts.org/cgi/search.pl",
    {
      params: {
        search_terms: query,
        search_simple: 1,
        action: "process",
        json: 1,
      },
    }
  );

  // The API returns a "products" array.
  const products = response.data.products || [];

  // Map the products to our Food type.
  const foods: Food[] = products.map((product: any) => ({
    id: product.id || product.code || Math.random().toString(), // use product.code or fallback unique id
    name: product.product_name || "No name",
    description: product.generic_name || "No description",
    image: product.image_front_small_url || product.image_front_url,
    calories: product.nutriments?.["energy-kcal_100g"] || 0,
  }));

  return foods;
};
