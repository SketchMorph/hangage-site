import { supabase } from "./supabaseClient";

export async function getLookbookWithProducts(id) {
  const { data, error } = await supabase
    .from("lookbook")
    .select(`
      id, title_ko, title_en, season, images,
      lookbook_products (
        product:product (
          id, name_ko, name_en, price, images, category
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching lookbook:", error);
    return null;
  }

  return data;
}
