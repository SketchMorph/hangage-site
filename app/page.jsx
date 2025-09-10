// app/page.jsx
"use client";
import HanbokLanding from "./_landing/HanbokLanding";

export default function HomePage() {
  // / 에 접근하면 한국어 랜딩 바로 보여줌
  return <HanbokLanding lang="ko" />;
}
