"use client";
import { useRouter } from "next/router";
import ko from "@/messages/ko.json";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import ja from "@/messages/ja.json";
import zh from "@/messages/zh.json";

const dictionaries = { ko, en, fr, ja, zh };

export function useTranslation() {
  const { locale } = useRouter(); // 현재 URL locale (/ko, /en 등)
  const dict = dictionaries[locale] || dictionaries.ko;

  function t(path) {
    return path.split(".").reduce((obj, key) => obj?.[key], dict);
  }

  return { t, locale };
}
