"use client";
import HanbokLanding from "../_landing/HanbokLanding";

export default function LangHomePage({ params }) {
  const { lang } = params;
  return <HanbokLanding lang={lang} />;
}
