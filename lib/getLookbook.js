"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * 특정 룩북을 상품과 함께 가져오는 함수
 * @param {string} id 룩북 ID
 * @returns {object|null} 룩북 데이터 (관련 상품 포함)
 */
export async function getLookbookWithProducts(id) {
  const { data, error } = await supabase
    .from("lookbook")
    .select(`
      id,
      title_ko,
      title_en,
      season,
      images,
      description_ko,
      description_en,
      lookbook_products (
        product:product_id (
          id,
          name_ko,
          price,
          images
        )
      )
    `)
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("❌ getLookbookWithProducts Error:", error);
    return null;
  }

  return data;
}
