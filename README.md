# 한스타일 '밝은' 상점 — Next.js 배포 키트

## 사용 방법
1) 의존성 설치
```bash
npm install
```

2) 개발 서버 실행
```bash
npm run dev
# http://localhost:3000
```

3) Vercel에 배포
- GitHub에 푸시 후 Vercel에서 New Project → repo 연결 → Deploy

## 구조
- `app/page.jsx` → 홈 페이지(업로드한 랜딩 컴포넌트를 사용)
- `app/_landing/HanbokLanding.jsx` → 제공한 원본 랜딩 코드
- `components/ui/*` → 간단한 shadcn 스타일 UI
- `styles/globals.css` → Tailwind 글로벌 스타일