import { supabase } from "./supabaseClient";

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }

  if (!data) {
    console.warn("No product found for id:", id);
    return null;
  }

  return data;
}


export async function getLookbookById(id) {
  const { data, error } = await supabase
    .from("lookbook")
    .select(`
      id, title_ko, title_en, title_fr, title_ja, title_zh,
      description_ko, description_en, description_fr, description_ja, description_zh,
      season, images,
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
