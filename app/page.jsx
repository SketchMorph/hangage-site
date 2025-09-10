// app/page.jsx
import { redirect } from "next/navigation";

export default function Home() {
  // 기본 언어는 한국어(/ko)로 redirect
  redirect("/ko");
}
